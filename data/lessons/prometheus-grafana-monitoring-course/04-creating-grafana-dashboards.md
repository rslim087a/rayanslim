---
sectionIndex: 3
name: Creating Grafana Dashboards
metaDescription: Build powerful Grafana dashboards using RED and USE methodologies with PromQL queries for comprehensive application monitoring.
---

# Creating Grafana Dashboards

<lite-youtube videoid="Fpw4Rwpb160"></lite-youtube>

## Resources from **Video Description**

**[▶️Prometheus Setup with Docker Compose](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-grafana-docker-compose)**
**[▶️PromQL Tutorial](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-query-language-promql)**


## Key Takeaways

**RED and USE Methodologies:** Combine **RED methodology** (Rate, Errors, Duration) for user experience metrics and **USE methodology** (Utilization, Saturation, Errors) for system-level monitoring. Create comprehensive dashboards covering both user-facing service performance and infrastructure health.

**Dynamic Variables and Stat Panels:** Use **`label_values()`** to create dynamic variables instead of hardcoded values, and build **stat panels** for quick indicators including process uptime (`now() - process_start_time_seconds`), total requests with `increase()`, error rate calculations, average request duration, and requests in progress.

**Advanced Visualizations:** Create **time series panels** for API throughput showing requests per second with `rate()`, **pie charts** for request status code distribution using `sum by (status)`, and **histogram quantile** panels displaying latency percentiles (P50, P90, P95, P99) with `histogram_quantile()` function.

**System Metrics Monitoring:** Monitor resource utilization with **CPU usage** (`process_cpu_usage`), **memory metrics** (resident, virtual, and usage bytes), **open file descriptors** ratios, and **garbage collection rates** using `rate()` on collected objects across different generations for application health insights.

---

