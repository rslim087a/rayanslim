/**
 * Homepage JavaScript - Two-level filtering: Fields -> Categories -> Courses
 * Static site version - loads courses from JSON and links directly to lessons
 */

class HomePage {
  constructor() {
    this.filtersContainer = document.getElementById('filters');
    this.coursesGrid = document.getElementById('courses-grid');
    this.roadmapDescription = document.getElementById('roadmap-description');
    this.courses = [];
    this.fields = {};
    this.fieldCategories = {};
    this.activeField = 'devops';
    this.activeCategory = null;
    this.roadmapContent = {
      devops: {
        title: 'DevOps',
        description: 'Become a <strong>DevOps Engineer</strong> who ships features multiple times per day without breaking production. This roadmap covers automation, monitoring, containerization, deployment pipelines, and the workflows that keep systems running reliably at scale.'
      },
      cloud: {
        title: 'Cloud',
        description: 'Become a <strong>Full Stack Cloud Engineer</strong> who builds applications that serve millions of users without crashing. This roadmap covers AWS scalable deployments, serverless architectures, and everything you need to run production systems on the cloud.'
      }
    };
    this.init();
  }

  async init() {
    await this.loadCourses();
    this.buildFieldCategories();
    this.renderFilters();
    this.renderCourses();
    this.attachFilterListeners();
    this.setInitialDevOpsState();
  }

  async loadCourses() {
    try {
      const response = await fetch('data/courses.json');
      const data = await response.json();
      this.courses = data.courses;
      this.fields = data.fields;
    } catch (error) {
      console.error('Error loading courses:', error);
      this.coursesGrid.innerHTML = '<p>Error loading courses. Please refresh the page.</p>';
    }
  }

  buildFieldCategories() {
    // Build a mapping of field -> categories
    this.courses.forEach(course => {
      course.field.forEach(field => {
        if (!this.fieldCategories[field]) {
          this.fieldCategories[field] = new Set();
        }
        if (course.category) {
          this.fieldCategories[field].add(course.category);
        }
      });
    });
  }

  renderFilters() {
    if (!this.filtersContainer) return;

    // Get unique fields and categories
    const fieldSet = new Set();
    const categorySet = new Set();

    this.courses.forEach(course => {
      course.field.forEach(f => fieldSet.add(f));
      if (course.category) categorySet.add(course.category);
    });

    // Calculate field counts
    const fieldCounts = {};
    fieldSet.forEach(field => {
      fieldCounts[field] = this.courses.filter(c => c.field.includes(field)).length;
    });

    // Generate field chips
    const fieldChips = Array.from(fieldSet).map(field => {
      const slugKey = field.toLowerCase().replace(/\s+/g, '-');
      return `<span class="filter-chip filter-chip-field" data-type="field" data-category="${slugKey}" tabindex="0">${field}<span class="chip-count">${fieldCounts[field]}</span></span>`;
    }).join('');

    // Generate category chips (hidden initially)
    const categoryChips = Array.from(categorySet).map(category => {
      const slugKey = category.toLowerCase().replace(/\s+/g, '-');
      const count = this.courses.filter(c => c.category === category).length;
      return `<span class="filter-chip filter-chip-category" data-type="category" data-category="${slugKey}" tabindex="0" style="display: none;">${category}<span class="chip-count">${count}</span></span>`;
    }).join('');

    this.filtersContainer.innerHTML = fieldChips + categoryChips;
  }

  renderCourses() {
    if (!this.coursesGrid) return;

    const cards = this.courses.map((course, index) => {
      const fieldClasses = course.field.map(f => f.toLowerCase().replace(/\s+/g, '-')).join(' ');
      const categoryClass = course.category ? course.category.toLowerCase().replace(/\s+/g, '-') : 'uncategorized';
      const isPaid = course.tier === 'paid';

      // Determine course number within its field
      const fieldOrders = {};
      course.field.forEach(field => {
        const fieldCourses = this.fields[field] || [];
        const fieldIndex = fieldCourses.indexOf(course.slug);
        fieldOrders[field.toLowerCase().replace(/\s+/g, '-')] = fieldIndex === 0 ? 'start-here' : fieldIndex + 1;
      });

      const isStartHere = Object.values(fieldOrders).includes('start-here');
      const courseNumberBadge = isStartHere
        ? '<div class="course-number-badge start-here">Start Here</div>'
        : `<div class="course-number-badge course-number" data-field-numbers='${JSON.stringify(fieldOrders)}'>${index + 1}</div>`;

      const thumbnailPath = course.thumbnail || course.slug;

      // Link to Udemy for paid courses, lesson page for free courses
      const courseUrl = isPaid && course.udemyUrl ? course.udemyUrl : `lesson.html?course=${course.slug}`;
      const targetAttr = isPaid && course.udemyUrl ? ' target="_blank" rel="noopener noreferrer"' : '';

      // Badge for paid courses
      const paidBadge = isPaid ? '<div class="course-badge badge-paid">Best Seller</div>' : '';

      // Stars HTML for paid courses
      const starsHtml = isPaid ? `
        <div class="course-rating">
          <div class="stars">
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
            <span class="star filled">★</span>
          </div>
          <span class="rating-text">${course.rating || '4.7'}</span>
        </div>
      ` : '<div class="free-badge-bottom badge-free">Free Access</div>';

      return `
        <div class="course-card ${fieldClasses} ${categoryClass}"
             data-slug="${course.slug}"
             data-fields="${course.field.join(',')}"
             data-category="${course.category || ''}">
          <a href="${courseUrl}" class="course-card-link" tabindex="0"${targetAttr}>
            <div class="course-thumbnail">
              <img src="assets/thumbnails/${thumbnailPath}.webp" alt="${course.title}" class="course-thumbnail-img" onerror="this.style.display='none'" />
              ${paidBadge}
              ${courseNumberBadge}
            </div>
            <div class="course-info">
              <h3 class="course-title">${course.title}</h3>
              <p class="course-description">${course.subtitle || ''}</p>
              <div class="course-meta">
                <span class="course-category">${course.category || 'General'}</span>
                <div class="course-meta-right">
                  ${starsHtml}
                </div>
              </div>
            </div>
          </a>
        </div>`;
    }).join('');

    this.coursesGrid.innerHTML = cards;
  }

  attachFilterListeners() {
    if (!this.filtersContainer) return;

    this.filtersContainer.querySelectorAll('.filter-chip').forEach(chip => {
      const activate = () => {
        if (chip.dataset.type === 'field') {
          this.selectField(chip.dataset.category, chip);
        } else {
          this.selectCategory(chip.dataset.category, chip);
        }
      };

      chip.addEventListener('click', activate);
      chip.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  setInitialDevOpsState() {
    const devopsChip = this.filtersContainer?.querySelector('.filter-chip-field[data-category="devops"]');
    if (devopsChip) devopsChip.classList.add('active');

    this.updateCategoryChipsVisibility();
    this.filterCourses();
  }

  selectField(fieldKey, chipElement) {
    const fieldChips = this.filtersContainer.querySelectorAll('.filter-chip-field');
    const categoryChips = this.filtersContainer.querySelectorAll('.filter-chip-category');

    if (this.activeField === fieldKey) {
      this.activeField = null;
      this.activeCategory = null;
      fieldChips.forEach(c => c.classList.remove('active'));
      categoryChips.forEach(c => c.classList.remove('active'));
    } else {
      this.activeField = fieldKey;
      this.activeCategory = null;
      fieldChips.forEach(c => c.classList.remove('active'));
      categoryChips.forEach(c => c.classList.remove('active'));
      chipElement.classList.add('active');
    }

    this.updateRoadmapBanner();
    this.updateCategoryChipsVisibility();
    this.filterCourses();
  }

  selectCategory(categoryKey, chipElement) {
    if (!this.activeField) return;

    const categoryChips = this.filtersContainer.querySelectorAll('.filter-chip-category');

    if (this.activeCategory === categoryKey) {
      this.activeCategory = null;
      chipElement.classList.remove('active');
    } else {
      this.activeCategory = categoryKey;
      categoryChips.forEach(c => c.classList.remove('active'));
      chipElement.classList.add('active');
    }

    this.filterCourses();
  }

  updateRoadmapBanner() {
    if (!this.activeField || !this.roadmapContent[this.activeField]) return;

    const content = this.roadmapContent[this.activeField];
    if (this.roadmapDescription) {
      this.roadmapDescription.innerHTML = content.description;
    }
  }

  updateCategoryChipsVisibility() {
    const categoryChips = this.filtersContainer.querySelectorAll('.filter-chip-category');

    if (!this.activeField) {
      categoryChips.forEach(chip => chip.style.display = 'none');
      return;
    }

    const fieldName = this.getFieldNameFromSlug(this.activeField);
    const fieldCategories = this.fieldCategories[fieldName] ? Array.from(this.fieldCategories[fieldName]) : [];

    categoryChips.forEach(chip => {
      const categoryKey = chip.dataset.category;
      const category = this.getCategoryNameFromSlug(categoryKey);

      if (fieldCategories.includes(category)) {
        const count = this.courses.filter(c =>
          c.field.includes(fieldName) &&
          c.category?.toLowerCase().replace(/\s+/g, '-') === categoryKey
        ).length;

        chip.style.display = count > 0 ? '' : 'none';
        const countSpan = chip.querySelector('.chip-count');
        if (countSpan) countSpan.textContent = count;
      } else {
        chip.style.display = 'none';
      }
    });
  }

  filterCourses() {
    if (!this.coursesGrid) return;

    const visibleCards = [];

    this.coursesGrid.querySelectorAll('.course-card').forEach(card => {
      const courseFields = card.dataset.fields?.split(',') || [];
      const courseCategory = card.dataset.category;

      let shouldShow = false;

      if (this.activeField) {
        const fieldName = this.getFieldNameFromSlug(this.activeField);
        shouldShow = courseFields.includes(fieldName);

        if (shouldShow && this.activeCategory) {
          const categoryName = this.getCategoryNameFromSlug(this.activeCategory);
          shouldShow = courseCategory === categoryName;
        }
      }

      card.style.display = shouldShow ? '' : 'none';
      if (shouldShow) visibleCards.push(card);
    });

    // Update course number badges based on visible order
    visibleCards.forEach((card, index) => {
      const badge = card.querySelector('.course-number-badge');
      if (badge && !badge.classList.contains('start-here')) {
        const fieldNumbers = badge.dataset.fieldNumbers ? JSON.parse(badge.dataset.fieldNumbers) : null;
        if (fieldNumbers && this.activeField && fieldNumbers[this.activeField]) {
          const fieldNumber = fieldNumbers[this.activeField];
          if (fieldNumber === 'start-here') {
            badge.classList.add('start-here');
            badge.classList.remove('course-number');
            badge.textContent = 'Start Here';
          } else {
            badge.textContent = fieldNumber;
          }
        }
      }
    });
  }

  getFieldNameFromSlug(slug) {
    const cleanSlug = slug.replace(/^\d+-/, '');
    return cleanSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  getCategoryNameFromSlug(slug) {
    const course = this.courses.find(c =>
      c.category?.toLowerCase().replace(/\s+/g, '-') === slug
    );
    return course?.category || slug;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new HomePage();
});
