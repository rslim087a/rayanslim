---
sectionIndex: 5
name: Prometheus Architecture
metaDescription: Understand the complete Prometheus architecture including operators, exporters, service discovery, and alerting components.
---

# Prometheus Architecture

<lite-youtube videoid="ihCy7BfidyE"></lite-youtube>

## Resources from Video Description

Written Summary: Current Page


## Key Takeaways

* **Prometheus Operator & CRDs** – Manages Prometheus, Alertmanager, and related components in Kubernetes using custom resources (`Prometheus`, `ServiceMonitor`, `PrometheusRule`).
* **Metrics Collection** – Node Exporter gathers system-level metrics; Kube State Metrics gathers Kubernetes object states; Prometheus scrapes them into its time-series DB.
* **Visualization** – Grafana connects to Prometheus with PromQL to create dashboards for both system and application metrics.
* **Alerting** – Prometheus evaluates `PrometheusRule` conditions and sends alerts to Alertmanager, which routes notifications to email, Slack, or PagerDuty.

---

