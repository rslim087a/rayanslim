---
sectionIndex: 11
name: Instrumenting NestJS Apps with Prometheus Metrics
metaDescription: Learn how to instrument a NestJS application to expose Prometheus metrics.
---

# **Instrumenting NestJS Apps with Prometheus Metrics**

In today's microservices-driven world, observability is crucial for maintaining and optimizing application performance. This guide will walk you through instrumenting a NestJS application to expose metrics that can be scraped by Prometheus, laying the groundwork for powerful monitoring and alerting capabilities.

# **Table of Contents**

1. Understanding Prometheus and Time-Series Metrics
2. Setting Up the NestJS Application
3. Instrumenting NestJS with Custom Metrics
4. Auto-instrumentation with @willsoto/nestjs-prometheus
5. Running the Application and Sending Traffic
6. Observing Metrics

# **Understanding Prometheus and Time-Series Metrics**

Prometheus is an open-source monitoring toolkit that stores metrics as time-series data, meaning each data point is associated with a timestamp. These metrics typically include:

- Counters: Cumulative metrics that only increase (e.g., total number of requests)
- Gauges: Metrics that can go up and down (e.g., current CPU usage)
- Histograms: Samples observations and counts them in configurable buckets (e.g., request durations)

To leverage Prometheus, applications need to be instrumented to expose metrics in a format that Prometheus can scrape. This instrumentation allows us to collect valuable data about our application's performance and behavior, which can later be used for monitoring, alerting, and optimization.

# **Setting Up the Nest.js Application**

Let's start by cloning and setting up the sample Nest.js application:

```bash
git clone https://github.com/rslim087a/nest-prometheus-monitoring-sample.git
cd nest-prometheus-monitoring-sample
npm install
```

To run the application in development mode, use:

```bash
npm run start:dev
```

For production, first build the application:

```bash
npm run build
```

Then start it:

```bash
npm run start:prod
```

# **Instrumenting Nest.js with Custom Metrics**

The sample application is already instrumented with custom metrics using the `@willsoto/nestjs-prometheus` package. Let's examine the key parts:

```typescript
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Histogram } from 'prom-client';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectMetric('http_request_duration_seconds') private readonly httpRequestDurationHistogram: Histogram<string>,
  ) {}

  @Post('items')
  createItem(@Body() createItemDto: CreateItemDto) {
    const end = this.httpRequestDurationHistogram.startTimer();
    const result = this.appService.createItem(createItemDto);
    end({ method: 'POST', route: '/items', code: '200' });
    return result;
  }

  // Similar implementation for other endpoints
}
```

`http_request_duration_seconds` is a Histogram that measures the duration of HTTP requests. It's considered a custom metric because we're explicitly defining it using the `@willsoto/nestjs-prometheus` package. It's not automatically generated or collected by the library itself. The package provides the tools (Histogram, Counter, Gauge) to create these metrics, but it's up to us to define them, give them names, descriptions, and labels, and then update them appropriately in our code.

# **Auto-instrumentation with @willsoto/nestjs-prometheus**

In addition to our custom metrics, Nest.js with `@willsoto/nestjs-prometheus` provides a wide range of auto-instrumented metrics out of the box. These metrics are automatically collected and don't require explicit code in our application. Some of these auto-instrumented metrics include:

**System metrics:**

- `process_cpu_user_seconds_total`: A Counter for total user CPU time spent.
- `process_cpu_system_seconds_total`: A Counter for total system CPU time spent.
- `process_cpu_seconds_total`: A Counter for total CPU time spent.
- `process_resident_memory_bytes`: A Gauge for resident memory size.

**Node.js specific metrics:**

- `nodejs_eventloop_lag_seconds`: A Gauge for event loop lag.
- `nodejs_active_handles_total`: A Gauge for the total number of active handles.
- `nodejs_active_requests_total`: A Gauge for the total number of active requests.

**Garbage collection metrics:**

- `nodejs_gc_duration_seconds`: A Histogram for garbage collection duration by kind.

These auto-instrumented metrics provide valuable insights into our application's performance and resource utilization without requiring additional code.

# **Running the Application and Sending Traffic**

Now that the application is set up and running, let's send some traffic to it using Postman:

1. Open Postman and import the provided collection `nest-postman-collection.json`.
2. Use the various requests in the collection to interact with the API:
    - Send GET requests to the root endpoint
    - Create, retrieve, update, and delete items using the /items endpoints

# **Observing Metrics**

After sending traffic to the application, let's observe the metrics:

1. In your browser or using a tool like curl, navigate to `http://localhost:3000/metrics`.
2. You'll see a list of all the metrics our application is tracking, including both custom and auto-instrumented metrics. Let's break down some key metrics:

```prometheus
# Custom metrics
# HELP http_request_duration_seconds Duration of HTTP requests in seconds
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.1",method="POST",route="/items",code="200"} 1
http_request_duration_seconds_bucket{le="0.3",method="POST",route="/items",code="200"} 1
...
http_request_duration_seconds_sum{method="POST",route="/items",code="200"} 0.000038458
http_request_duration_seconds_count{method="POST",route="/items",code="200"} 1

# Auto-instrumented metrics
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.18875

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 55181312

# HELP nodejs_eventloop_lag_seconds Lag of event loop in seconds.
# TYPE nodejs_eventloop_lag_seconds gauge
nodejs_eventloop_lag_seconds 0

# HELP nodejs_active_handles_total Total number of active handles.
# TYPE nodejs_active_handles_total gauge
nodejs_active_handles_total 5

# HELP nodejs_gc_duration_seconds Garbage collection duration by kind, one of major, minor, incremental or weakcb.
# TYPE nodejs_gc_duration_seconds histogram
nodejs_gc_duration_seconds_bucket{le="0.001",kind="minor"} 1
...
nodejs_gc_duration_seconds_sum{kind="minor"} 0.0004331669807434082
nodejs_gc_duration_seconds_count{kind="minor"} 1
```

- The custom `http_request_duration_seconds` histogram provides information about HTTP request durations.
- The auto-instrumented `process_cpu_user_seconds_total` gives us insight into our application's CPU usage.
- The auto-instrumented `process_resident_memory_bytes` provides information about memory usage.
- The auto-instrumented `nodejs_eventloop_lag_seconds` shows the lag of the event loop.
- The auto-instrumented `nodejs_active_handles_total` shows the number of active handles in our application.
- The auto-instrumented `nodejs_gc_duration_seconds` provides information about garbage collection durations.

These metrics, both custom and auto-instrumented, are now exposed in a format that Prometheus can understand and scrape. In future steps, you can set up Prometheus to scrape these metrics at regular intervals, storing them for analysis and visualization. This data can then be used with tools like Grafana to create insightful dashboards, or with Prometheus's built-in alerting to notify you of potential issues before they become critical problems.

By instrumenting your Nest.js application with Prometheus metrics, you've taken a significant step towards improving your application's observability. This will allow you to monitor performance, track usage patterns, and quickly identify and resolve issues as they arise.