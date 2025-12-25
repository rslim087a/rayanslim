---
sectionIndex: 8
name: MongoDB Monitoring
metaDescription: Monitor MongoDB databases with Prometheus exporters, authentication secrets, and specialized NoSQL metrics visualization.
---

# MongoDB Monitoring

<lite-youtube videoid="ub8KIqpMpPM"></lite-youtube>

## Resources from **Video Description**

- [Github Repository](https://github.com/rslim087a/mongodb-exporter-sample)
- [Prometheus Community Helm Repository](https://prometheus-community.github.io/helm-charts/)
- [Installing Helm (Mac and Windows)](https://rayanslim.com/course/prometheus-grafana-monitoring-course/helm-installation)
- [Install Prometheus and Grafana on Kubernetes](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-on-kubernetes)

## Key Takeaways

* **MongoDB Exporter** – Scrapes MongoDB stats and exposes them at its own `/metrics` endpoint for Prometheus to pull.
* **Discovery via ServiceMonitor** – A `ServiceMonitor` tells Prometheus where the exporter lives; kube-prometheus-stack installs typically require the `release: prometheus` label for discovery.
* **Cluster DNS & Ports** – Exporters reach MongoDB through the Service DNS/port (e.g., `mongodb.mongodb.svc.cluster.local:27017`) regardless of namespaces.
* **Auth via Secrets/URI** – Connection is provided as a MongoDB URI; best practice is to source it from a Kubernetes `Secret` (e.g., `existingSecret` with a `connectionURI` key) rather than hardcoding credentials.
* **End-to-End Flow & Health Signal** – Exporter → Prometheus TSDB → Grafana dashboards; the `mongodb_up` metric (`1` = up) confirms connectivity and scraping.

---

