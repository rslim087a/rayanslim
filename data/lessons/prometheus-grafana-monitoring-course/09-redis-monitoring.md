---
sectionIndex: 9
name: Redis Monitoring
metaDescription: Complete Redis monitoring setup with Prometheus exporters, authentication, service monitors, and performance dashboards.
---

# Redis Monitoring

<lite-youtube videoid="QFjVTMtd0nU"></lite-youtube>

## Resources from **Video Description**

- [Github Repository](https://github.com/rslim087a/redis-prometheus-sample)
- [Prometheus Community Helm Repository](https://prometheus-community.github.io/helm-charts/)
- [Installing Helm (Mac and Windows)](https://rayanslim.com/course/prometheus-grafana-monitoring-course/helm-installation)
- [Install Prometheus and Grafana on Kubernetes](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-on-kubernetes)

## Key Takeaways

* **Redis Exporter** – Exposes Redis metrics at its own `/metrics` endpoint for Prometheus to scrape.
* **Discovery via ServiceMonitor** – A `ServiceMonitor` tells Prometheus where the exporter lives; kube-prometheus-stack setups typically require the `release: prometheus` label for discovery.
* **Kubernetes DNS & Cross-Namespace Access** – Exporters reach Redis through the Service’s DNS/port (e.g., `redis.database-monitoring.svc.cluster.local:6379`), regardless of namespaces.
* **Secrets-Based Auth** – Redis commonly uses password-only auth; the exporter can reference a `Secret` to authenticate securely.
* **End-to-End Flow & Health Signal** – Exporter → Prometheus TSDB → Grafana dashboards; the `redis_up` metric (`1` = up) confirms connectivity and scraping.

---

