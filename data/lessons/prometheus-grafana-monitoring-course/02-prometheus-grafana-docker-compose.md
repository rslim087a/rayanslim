---
sectionIndex: 1
name: Prometheus and Grafana with Docker Compose
metaDescription: Set up Prometheus and Grafana using Docker Compose to monitor containerized applications and create your first monitoring dashboard.
---

# Prometheus and Grafana with Docker Compose

<lite-youtube videoid="kAVBNgsrtik"></lite-youtube>

## Resources from **Video Description**

- **[GitHub Repository](https://github.com/rslim087a/prometheus-docker-compose.git)** - Starter code and configuration files
- **Written Summary: Current Page**

## 📖 Extra Resources

Tutorials that explain how to instrument various types of applications to expose prometheus metrics:
- [NestJS](https://rayanslim.com/course/prometheus-grafana-monitoring-course/nest)
- [Spring Boot](https://rayanslim.com/course/prometheus-grafana-monitoring-course/springboot)
- [Node.js](https://rayanslim.com/course/prometheus-grafana-monitoring-course/node)
- [Flask](https://rayanslim.com/course/prometheus-grafana-monitoring-course/flask)

## Key Takeaways

**Docker Compose Monitoring Stack:** Set up Prometheus, Grafana, and a FastAPI application using Docker Compose, where Prometheus scrapes metrics every 15 seconds from the application's `/metrics` endpoint. Use volumes to load the `prometheus.yml` configuration file that tells Prometheus which endpoints to monitor.

**Application Metrics Exposure:** The FastAPI application exposes **counter metrics** (total HTTP requests), **gauge metrics** (virtual memory bytes), and **histogram metrics** (HTTP request duration buckets) at `localhost:8000/metrics` that Prometheus can understand and scrape.

**Container Network Communication:** While you access services via `localhost:port` from your machine, containers communicate using **container names and ports** within the Docker Compose network. Prometheus connects to the FastAPI app using `fastapi-app:8000/metrics` internally.

**Grafana Configuration and Dashboards:** Connect Grafana to Prometheus using `prometheus:9090` as the data source URL, then import pre-built dashboards to visualize **request rate**, **average response time**, **memory usage**, and **CPU usage** of your application in real-time.

---

