---
sectionIndex: 7
name: PostgreSQL Monitoring
metaDescription: Implement PostgreSQL monitoring using Prometheus exporters with authentication, service discovery, and comprehensive dashboards.
---

# PostgreSQL Monitoring

<lite-youtube videoid="akenLC8nx1c"></lite-youtube>

## Resources from **Video Description**

- [Github Repository](https://github.com/rslim087a/postgres-prometheus-sample)
- [Prometheus Community Helm Repository](https://prometheus-community.github.io/helm-charts/)
- [Installing Helm (Mac and Windows)](https://rayanslim.com/course/prometheus-grafana-monitoring-course/helm-installation)
- [Install Prometheus and Grafana on Kubernetes](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-on-kubernetes)

## Key Takeaways

* **PostgreSQL Exporter** – A Prometheus exporter scrapes PostgreSQL stats and exposes them at its own `/metrics` endpoint for Prometheus to pull.
* **Discovery via ServiceMonitor** – A `ServiceMonitor` resource tells Prometheus where the exporter’s endpoint lives; kube-prometheus-stack setups often require the `release: prometheus` label for discovery.
* **Kubernetes Service DNS & Ports** – Exporters reach databases through cluster DNS (e.g., `postgresql.database-monitoring.svc.cluster.local`) and the service’s port (commonly `5432`).
* **Secrets-Based Auth** – Credentials for the exporter are provided securely through Kubernetes `Secret`s (username/password keys), enabling authenticated access to the database.
* **End-to-End Flow & Health Signal** – Exporter → Prometheus TSDB → Grafana dashboards; the `pg_up` metric (value `1`) is a simple health check confirming the exporter can reach PostgreSQL.

---

