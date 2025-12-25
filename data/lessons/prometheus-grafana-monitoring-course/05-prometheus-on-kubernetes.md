---
sectionIndex: 4
name: Prometheus on Kubernetes
metaDescription: Deploy Prometheus and Grafana on Kubernetes using the kube-prometheus stack with service monitors and application monitoring.
---

# Prometheus on Kubernetes

<lite-youtube videoid="r45DkTMMouc"></lite-youtube>

## Resources from **Video Description**

- **[GitHub Repository](https://github.com/rslim087a/application-monitoring-prometheus)** - Kubernetes manifests and ServiceMonitor examples
- **[Helm Repository](https://prometheus-community.github.io/helm-charts)** - Prometheus Community Helm charts
- **Written Summary: Current Page**

## 📖 Extra Resources:
- [Installing Helm (Mac and Windows)](https://rayanslim.com/course/prometheus-grafana-monitoring-course/helm-installation)
- [NestJS Prometheus Metrics](https://rayanslim.com/course/prometheus-grafana-monitoring-course/nest)
- [Spring Boot Prometheus Metrics](https://rayanslim.com/course/prometheus-grafana-monitoring-course/springboot)
- [Node.js Prometheus Metrics](https://rayanslim.com/course/prometheus-grafana-monitoring-course/node)
- [Flask Prometheus Metrics](https://rayanslim.com/course/prometheus-grafana-monitoring-course/flask)


## Key Takeaways

**Kube-Prometheus Stack Deployment:** Deploy production-ready monitoring using the **kube-prometheus stack** via Helm, which includes Prometheus, Grafana, Alertmanager, and essential Kubernetes monitoring components. This stack automatically configures service discovery, RBAC permissions, and persistent storage for your cluster.

**Service Monitor Configuration:** Use **ServiceMonitor** custom resources to automatically discover and scrape application metrics. Define label selectors, endpoint configurations, and scraping intervals to integrate your applications with the Prometheus ecosystem without manual configuration changes.

**Kubernetes Resource Monitoring:** Monitor cluster health with built-in **kube-state-metrics** and **node-exporter** components that expose pod status, resource utilization, and node metrics. These provide comprehensive visibility into cluster performance and resource allocation.

**Application Integration:** Integrate custom applications by exposing metrics endpoints and creating corresponding ServiceMonitor resources. The operator automatically updates Prometheus configuration, enabling seamless monitoring of new services as they're deployed to the cluster.

---

