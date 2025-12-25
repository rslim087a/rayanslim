---
sectionIndex: 11
name: Instrumenting Spring Boot Apps with Prometheus Metrics
metaDescription: Learn how to instrument a Spring Boot application to expose Prometheus metrics.
---

# **Instrumenting Spring Boot Apps with Prometheus Metrics**

In today's microservices-driven world, observability is crucial for maintaining and optimizing application performance. This guide will walk you through instrumenting a Spring Boot application to expose metrics that can be scraped by Prometheus, laying the groundwork for powerful monitoring and alerting capabilities.

# **Table of Contents**

1. Understanding Prometheus and Time-Series Metrics
2. Setting Up the Spring Boot Application
3. Instrumenting Spring Boot with Custom Metrics
4. Auto-instrumentation with Micrometer
5. Running the Application and Sending Traffic
6. Observing Metrics

# **Understanding Prometheus and Time-Series Metrics**

Prometheus is an open-source monitoring toolkit that stores metrics as time-series data, meaning each data point is associated with a timestamp. These metrics typically include:

- **Counters**: Cumulative metrics that only increase (e.g., total number of requests)
- **Gauges**: Metrics that can go up and down (e.g., current CPU usage)
- **Histograms**: Samples observations and counts them in configurable buckets (e.g., request durations)

To leverage Prometheus, applications need to be instrumented to expose metrics in a format that Prometheus can scrape. This instrumentation allows us to collect valuable data about our application's performance and behavior, which can later be used for monitoring, alerting, and optimization.

# **Setting Up the Spring Boot Application**

Let's start by cloning and setting up the sample Spring Boot application:

```bash
git clone https://github.com/rslim087a/springboot-prometheus-monitoring-sample
cd springboot-prometheus-monitoring-sample
```

Build the project:

```bash
mvn clean install
```

To run the application, use the following command:

```bash
mvn spring-boot:run
```

The application will start and be available at `http://localhost:8080`.

# **Instrumenting Spring Boot with Custom Metrics**

Inspect the source code. The application is already instrumented with custom metrics using the Micrometer library, which Spring Boot uses for its metrics abstraction. Let's examine the key parts:

```java
static class MetricsInterceptor implements HandlerInterceptor {
    private final MeterRegistry meterRegistry;
    private final AtomicInteger inProgressRequests;

    public MetricsInterceptor(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.inProgressRequests = new AtomicInteger(0);
        meterRegistry.gauge("http_requests_in_progress", Tags.empty(), inProgressRequests);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        inProgressRequests.incrementAndGet();
        request.setAttribute("startTime", System.nanoTime());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        inProgressRequests.decrementAndGet();
        long startTime = (long) request.getAttribute("startTime");
        long duration = System.nanoTime() - startTime;
        String method = request.getMethod();
        String path = request.getRequestURI();
        String status = String.valueOf(response.getStatus());

        Tags tags = Tags.of(
            "method", method,
            "path", path,
            "status", status
        );

        meterRegistry.counter("http_request_total", tags).increment();
        meterRegistry.timer("http_request_duration_seconds", tags).record(duration, TimeUnit.NANOSECONDS);
    }
}
```

It's important to note that these metrics are custom-defined:

Custom HTTP metrics:

- `http_request_total`: A Counter to track the total number of HTTP requests.
- `http_request_duration_seconds`: A Timer to measure the duration of HTTP requests.
- `http_requests_in_progress`: A Gauge to monitor the number of ongoing HTTP requests.

These metrics are custom because we're explicitly defining them using the Micrometer library. They're not automatically generated or collected by the library itself. Micrometer provides the tools (Counter, Timer, Gauge) to create these metrics, but it's up to us to define them, give them names, descriptions, and labels, and then update them appropriately in our code.

# **Auto-instrumentation with Micrometer**

In addition to our custom metrics, Spring Boot with Micrometer provides a wide range of auto-instrumented metrics out of the box. These metrics are automatically collected and don't require explicit code in our application. Some of these auto-instrumented metrics include:

**System metrics**:

- `process_cpu_usage`: A Gauge tracking CPU usage of the JVM process.
- `process_cpu_time_ns_total`: A Counter for total CPU time used by the JVM process.
- `system_cpu_usage`: A Gauge for system-wide CPU usage.
- `jvm_memory_used_bytes`: A Gauge for JVM memory usage.

**JVM metrics**:

- `jvm_threads_live_threads`: A Gauge for the number of live threads.
- `jvm_gc_memory_allocated_bytes_total`: A Counter for allocated memory.
- `jvm_gc_pause_seconds`: A Timer for GC pause durations.

These auto-instrumented metrics provide valuable insights into our application's performance and resource utilization without requiring additional code.

# **Running the Application and Sending Traffic**

Now that the application is set up and running, let's send some traffic to it using Postman:

1. Open Postman and import the provided collection `spring-boot-metrics-postman-collection.json`.
2. Use the various requests in the collection to interact with the API:
    - Send GET requests to the root endpoint
    - Create, retrieve, update, and delete items using the /items endpoints

# **Observing Metrics**

After sending traffic to the application, let's observe the metrics: In your browser or using a tool like curl, navigate to `http://localhost:8080/actuator/prometheus`. You'll see a list of all the metrics our application is tracking, including both custom and auto-instrumented metrics. Let's break down some key metrics:

```prometheus
# Custom metrics
# HELP http_request_total Total HTTP Requests
# TYPE http_request_total counter
http_request_total{method="GET",status="200",path="/"} 5.0

# HELP http_request_duration_seconds HTTP Request Duration
# TYPE http_request_duration_seconds summary
http_request_duration_seconds_count{method="GET",status="200",path="/"} 5.0
http_request_duration_seconds_sum{method="GET",status="200",path="/"} 0.1234

# HELP http_requests_in_progress HTTP Requests in progress
# TYPE http_requests_in_progress gauge
http_requests_in_progress 0.0

# Auto-instrumented metrics
# HELP process_cpu_usage The "recent cpu usage" for the Java Virtual Machine process
# TYPE process_cpu_usage gauge
process_cpu_usage 0.005727542707830135

# HELP jvm_memory_used_bytes The amount of used memory
# TYPE jvm_memory_used_bytes gauge
jvm_memory_used_bytes{area="heap",id="G1 Old Gen"} 1.602048E7

# HELP jvm_threads_live_threads The current number of live threads including both daemon and non-daemon threads
# TYPE jvm_threads_live_threads gauge
jvm_threads_live_threads 21.0
```

- The custom `http_request_total counter` shows how many requests of each type we've received.
- The custom `http_request_duration_seconds` summary provides information about request durations.
- The custom `http_requests_in_progress` gauge shows how many requests are currently being processed.
- The auto-instrumented `process_cpu_usage` gives us insight into our application's CPU usage.
- The auto-instrumented `jvm_memory_used_bytes` provides information about memory usage.
- The auto-instrumented `jvm_threads_live_threads` shows the number of live threads in our application.

These metrics, both custom and auto-instrumented, are now exposed in a format that Prometheus can understand and scrape. In future steps, you can set up Prometheus to scrape these metrics at regular intervals, storing them for analysis and visualization. This data can then be used with tools like Grafana to create insightful dashboards, or with Prometheus's built-in alerting to notify you of potential issues before they become critical problems.