---
sectionIndex: 2
name: Prometheus Query Language (PromQL)
metaDescription: Master PromQL from basic metrics queries to production-grade monitoring with functions, aggregations, and time series analysis.
---

# Prometheus Query Language (PromQL)

<lite-youtube videoid="RC1ivt-ZN_U"></lite-youtube>

## Resources from **Video Description**

- **[▶️Prometheus Setup with Docker Compose](https://www.rayanslim.com/course/prometheus-grafana-monitoring-course/prometheus-grafana-docker-compose)**
- **Written Summary: Current Page**

## Key Takeaways

**Three Core Metric Types:** **Counter metrics** only go up (like total HTTP requests), **gauge metrics** fluctuate up and down (like CPU usage), and **histogram metrics** distribute data into buckets (like request duration). Each type requires specific PromQL functions - `rate()` for counters, `delta()` for gauges.

**Instant vs Range Vectors:** **Instant vectors** return the most recent value per time series, while **range vectors** return a time range of values using `[5m]` syntax. The `rate()` function requires range vectors and calculates per-second averages, while `irate()` uses only the last two data points.

**Aggregation Operations:** Use `sum()`, `avg()`, `max()`, `min()` on instant vectors to aggregate into single values. Add `by (label)` for grouping by labels. **Aggregation over time** functions like `sum_over_time()` and `avg_over_time()` take range vectors and produce instant vectors.

**Histogram Analysis and Advanced Functions:** Use `histogram_quantile(0.95, sum by (le) (metric_bucket))` to calculate percentiles from histogram data. Calculate average request duration by dividing `rate(duration_sum)` by `rate(request_count)`. Use `increase()` for counter totals, `top_k()` for ranking, and label manipulation with `label_replace()`.

---

