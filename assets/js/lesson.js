/**
 * Lesson Page JavaScript - Client-side markdown loading and navigation
 * Static site version - loads lessons from markdown files
 */

class LessonPage {
  constructor() {
    this.courseSlug = null;
    this.lessonSlug = null;
    this.course = null;
    this.sections = [];
    this.lessons = [];
    this.currentSectionIndex = 0;
    this.currentLessonIndex = 0;
    this.init();
  }

  async init() {
    // Parse URL parameters
    const params = new URLSearchParams(window.location.search);
    this.courseSlug = params.get('course');
    this.lessonSlug = params.get('lesson');

    if (!this.courseSlug) {
      this.showError('No course specified. Please select a course from the homepage.');
      return;
    }

    try {
      await this.loadCourse();
      await this.loadSections();
      await this.buildLessonsList();

      // If no lesson specified, load the first lesson
      if (!this.lessonSlug && this.lessons.length > 0) {
        this.lessonSlug = this.lessons[0].slug;
        // Update URL without reload
        const newUrl = `lesson.html?course=${this.courseSlug}&lesson=${this.lessonSlug}`;
        window.history.replaceState({}, '', newUrl);
      }

      this.renderCourseHeader();
      this.renderSidebar();
      await this.loadLesson();
      this.initMobileSidebar();
    } catch (error) {
      console.error('Error initializing lesson page:', error);
      this.showError('Error loading course content. Please try again.');
    }
  }

  async loadCourse() {
    const response = await fetch('data/courses.json');
    const data = await response.json();
    this.course = data.courses.find(c => c.slug === this.courseSlug);

    if (!this.course) {
      throw new Error('Course not found');
    }
  }

  async loadSections() {
    try {
      const response = await fetch(`data/lessons/${this.courseSlug}/sections.json`);
      if (response.ok) {
        this.sections = await response.json();
      } else {
        // If no sections.json, create a default section
        this.sections = [{ index: 0, title: 'Lessons' }];
      }
    } catch (error) {
      console.warn('Could not load sections.json, using default:', error);
      this.sections = [{ index: 0, title: 'Lessons' }];
    }
  }

  async buildLessonsList() {
    // For static sites, we need to know the lesson files in advance
    // We'll try to fetch an index file or use a predefined list
    try {
      const response = await fetch(`data/lessons/${this.courseSlug}/index.json`);
      if (response.ok) {
        this.lessons = await response.json();
        return;
      }
    } catch (error) {
      // Index file doesn't exist, try to discover lessons
    }

    // Fallback: Try common lesson patterns
    this.lessons = [];
    for (let i = 1; i <= 50; i++) {
      const paddedIndex = i.toString().padStart(2, '0');
      // Try to fetch each potential lesson file
      const patterns = [
        `${paddedIndex}-introduction.md`,
        `${paddedIndex}-implementation.md`,
        `${paddedIndex}-clean-up.md`,
        `${paddedIndex}-conclusion.md`
      ];

      for (const pattern of patterns) {
        try {
          const response = await fetch(`data/lessons/${this.courseSlug}/${pattern}`, { method: 'HEAD' });
          if (response.ok) {
            const slug = pattern.replace(/^\d+-/, '').replace('.md', '');
            // Fetch the actual file to get metadata
            const contentResponse = await fetch(`data/lessons/${this.courseSlug}/${pattern}`);
            if (contentResponse.ok) {
              const content = await contentResponse.text();
              const { metadata } = this.parseFrontmatter(content);
              this.lessons.push({
                file: pattern,
                slug: metadata.slug || slug,
                name: metadata.name || this.formatSlugAsTitle(slug),
                sectionIndex: parseInt(metadata.sectionIndex) || 0
              });
            }
          }
        } catch (e) {
          // File doesn't exist, continue
        }
      }
    }

    // Sort lessons by file name
    this.lessons.sort((a, b) => a.file.localeCompare(b.file));
  }

  formatSlugAsTitle(slug) {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  parseFrontmatter(content) {
    const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
    if (!match) return { metadata: {}, body: content };

    const metadata = {};
    match[1].split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    });

    return { metadata, body: match[2] };
  }

  renderCourseHeader() {
    const headerContainer = document.getElementById('course-header');
    if (!headerContainer || !this.course) return;

    headerContainer.innerHTML = `
      <div class="course-header-section">
        <div class="hero">
          <div class="hero-content">
            <h1 class="hero-title">${this.course.title}</h1>
            ${this.course.subtitle ? `<p class="hero-subtitle">${this.course.subtitle}</p>` : ''}
          </div>
        </div>
      </div>
    `;
  }

  renderSidebar() {
    const sidebarContainer = document.getElementById('sidebar');
    if (!sidebarContainer) return;

    // Group lessons by section
    const sectionLessons = {};
    this.sections.forEach(section => {
      sectionLessons[section.index] = [];
    });

    this.lessons.forEach((lesson, idx) => {
      const sectionIdx = lesson.sectionIndex || 0;
      if (!sectionLessons[sectionIdx]) {
        sectionLessons[sectionIdx] = [];
      }
      sectionLessons[sectionIdx].push({ ...lesson, globalIndex: idx });
    });

    // Find current lesson position
    const currentLesson = this.lessons.find(l => l.slug === this.lessonSlug);
    const currentSectionIdx = currentLesson?.sectionIndex || 0;

    const sidebarHtml = this.sections.map((section, sIdx) => {
      const lessons = sectionLessons[section.index] || [];
      if (lessons.length === 0) return '';

      const isCurrentSection = section.index === currentSectionIdx;

      return `
        <details class="section" ${isCurrentSection ? 'open' : ''}>
          <summary>
            Section ${sIdx + 1} - ${section.title}
            <svg class="section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          </summary>
          <div class="lessons">
            ${lessons.map((lesson, lIdx) => `
              <div
                class="lesson${lesson.slug === this.lessonSlug ? ' active' : ''}"
                data-section="${section.index}"
                data-lesson="${lIdx}"
                data-slug="${lesson.slug}"
                tabindex="0"
              >
                <span class="lesson-number">L${lIdx + 1}</span>
                <span>${lesson.name}</span>
              </div>
            `).join('')}
          </div>
        </details>
      `;
    }).join('');

    sidebarContainer.innerHTML = sidebarHtml;

    // Add click handlers for lessons
    sidebarContainer.querySelectorAll('.lesson').forEach(lessonEl => {
      lessonEl.addEventListener('click', () => {
        const slug = lessonEl.dataset.slug;
        this.navigateToLesson(slug);
      });

      lessonEl.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const slug = lessonEl.dataset.slug;
          this.navigateToLesson(slug);
        }
      });
    });
  }

  async loadLesson() {
    const lessonContent = document.getElementById('lesson-content');
    if (!lessonContent) return;

    // Find the lesson file
    const lesson = this.lessons.find(l => l.slug === this.lessonSlug);
    if (!lesson) {
      this.showError('Lesson not found.');
      return;
    }

    try {
      const response = await fetch(`data/lessons/${this.courseSlug}/${lesson.file}`);
      if (!response.ok) {
        throw new Error('Lesson file not found');
      }

      const content = await response.text();
      const { metadata, body } = this.parseFrontmatter(content);

      // Update page title
      document.title = `${metadata.name || lesson.name} | ${this.course.title}`;

      // Configure marked for GitHub-flavored markdown
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true
      });

      // Convert markdown to HTML
      const htmlContent = marked.parse(body);

      // Calculate prev/next lessons
      const currentIndex = this.lessons.findIndex(l => l.slug === this.lessonSlug);
      const prevLesson = currentIndex > 0 ? this.lessons[currentIndex - 1] : null;
      const nextLesson = currentIndex < this.lessons.length - 1 ? this.lessons[currentIndex + 1] : null;

      // Render lesson content
      lessonContent.innerHTML = `
        <div class="lesson-content">
          <div class="markdown-body">${htmlContent}</div>
          <div class="lesson-actions">
            ${prevLesson ? `<button class="btn btn-secondary prev-lesson-btn" data-slug="${prevLesson.slug}">Previous Lesson</button>` : ''}
            ${nextLesson ? `<button class="btn btn-secondary next-lesson-btn" data-slug="${nextLesson.slug}">Next Lesson</button>` : '<span class="course-complete">Course Complete!</span>'}
          </div>
        </div>
      `;

      // Add navigation button handlers
      const prevBtn = lessonContent.querySelector('.prev-lesson-btn');
      const nextBtn = lessonContent.querySelector('.next-lesson-btn');

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          this.navigateToLesson(prevBtn.dataset.slug);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.navigateToLesson(nextBtn.dataset.slug);
        });
      }

      // Update sidebar active state
      this.updateSidebarActiveState();

      // Scroll to top
      window.scrollTo(0, 0);

    } catch (error) {
      console.error('Error loading lesson:', error);
      this.showError('Error loading lesson content.');
    }
  }

  navigateToLesson(slug) {
    this.lessonSlug = slug;
    const newUrl = `lesson.html?course=${this.courseSlug}&lesson=${slug}`;
    window.history.pushState({}, '', newUrl);
    this.loadLesson();
    this.updateSidebarActiveState();
    this.closeSidebar();
  }

  updateSidebarActiveState() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;

    // Remove active from all lessons
    sidebar.querySelectorAll('.lesson').forEach(el => {
      el.classList.remove('active');
    });

    // Add active to current lesson
    const currentLessonEl = sidebar.querySelector(`.lesson[data-slug="${this.lessonSlug}"]`);
    if (currentLessonEl) {
      currentLessonEl.classList.add('active');

      // Open the section containing this lesson
      const section = currentLessonEl.closest('.section');
      if (section) {
        section.open = true;
      }
    }
  }

  showError(message) {
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
      lessonContent.innerHTML = `
        <div class="error-message">
          <h2>Error</h2>
          <p>${message}</p>
          <a href="index.html" class="btn btn-primary">Back to Courses</a>
        </div>
      `;
    }
  }

  initMobileSidebar() {
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    `;

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';

    document.body.appendChild(toggleBtn);
    document.body.appendChild(overlay);

    const sidebar = document.querySelector('.sidebar');

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    overlay.addEventListener('click', () => {
      this.closeSidebar();
    });

    // Close on escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        this.closeSidebar();
      }
    });
  }

  closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Handle browser back/forward navigation
window.addEventListener('popstate', () => {
  // Reload the page to handle navigation properly
  window.location.reload();
});

document.addEventListener('DOMContentLoaded', () => {
  new LessonPage();
});
