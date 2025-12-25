---
sectionIndex: 11
name: Instrumenting Flask Apps with Prometheus Metrics
metaDescription: Learn how to instrument a Flask application to expose Prometheus metrics.
---

# **Instrumenting Flask Apps with Prometheus Metrics**

In today's microservices-driven world, observability is crucial for maintaining and optimizing application performance. This guide will walk you through instrumenting a Flask application to expose metrics that can be scraped by Prometheus, laying the groundwork for powerful monitoring and alerting capabilities.

# **Table of Contents**

1. Understanding Prometheus and Time-Series Metrics
2. Setting Up the Flask Application
3. Instrumenting Flask with Custom Metrics
4. Running the Application and Sending Traffic
5. Observing Metrics

# **Understanding Prometheus and Time-Series Metrics**

Prometheus is an open-source monitoring toolkit that stores metrics as time-series data, meaning each data point is associated with a timestamp. These metrics typically include:

- Counters: Cumulative metrics that only increase (e.g., total number of requests)
- Gauges: Metrics that can go up and down (e.g., current CPU usage)
- Histograms: Samples observations and counts them in configurable buckets (e.g., request durations)

To leverage Prometheus, applications need to be instrumented to expose metrics in a format that Prometheus can scrape. This instrumentation allows us to collect valuable data about our application's performance and behavior, which can later be used for monitoring, alerting, and optimization.

# **Setting Up the Flask Application**

Let's start by cloning and setting up the sample Flask application:

```bash
git clone https://github.com/rslim087a/flask-prometheus-monitoring-sample.git
cd flask-prometheus-monitoring-sample
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate the virtual environment (macOS and Linux):

```bash
source venv/bin/activate
```

Activate the virtual environment (Windows):

```bash
venv\Scripts\activate
```

Upgrade pip:

```bash
pip install --upgrade pip
```

Install the required packages:

```bash
pip install -r requirements.txt
```

To run the application, use the following command:

```bash
python app.py
```

The application will start and be available at `http://localhost:5001`.

# **Instrumenting Flask with Custom Metrics**

Inspect the code inside of `app.py`. The application is already instrumented with custom metrics using the `prometheus_client` library. Let's examine the key parts:

```python
from prometheus_client import Counter, Histogram, Gauge, generate_latest, CONTENT_TYPE_LATEST, REGISTRY

# Custom metrics
REQUEST_COUNT = Counter('http_request_total', 'Total HTTP Requests', ['method', 'status', 'path'])
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'HTTP Request Duration', ['method', 'status', 'path'])
REQUEST_IN_PROGRESS = Gauge('http_requests_in_progress', 'HTTP Requests in progress', ['method', 'path'])

# System metrics
CPU_USAGE = Gauge('process_cpu_usage', 'Current CPU usage in percent')
MEMORY_USAGE = Gauge('process_memory_usage_bytes', 'Current memory usage in bytes')
```

It's important to note that all of these metrics are custom-defined:

- Custom HTTP metrics:
    - `REQUEST_COUNT`: A Counter to track the total number of HTTP requests.
    - `REQUEST_LATENCY`: A Histogram to measure the duration of HTTP requests.
    - `REQUEST_IN_PROGRESS`: A Gauge to monitor the number of ongoing HTTP requests.
- Custom system metrics:
    - `CPU_USAGE`: A Gauge to track CPU usage.
    - `MEMORY_USAGE`: A Gauge to monitor memory usage.

These metrics are all custom because we're explicitly defining them using the Prometheus client library. They're not automatically generated or collected by the library itself. The `prometheus_client` library provides the tools (Counter, Histogram, Gauge) to create these metrics, but it's up to us to define them, give them names, descriptions, and labels, and then update them appropriately in our code.

# **Updating Custom Metrics**

To collect and update these custom metrics, we use Flask's `before_request` and `after_request` hooks:

```python
@app.before_request
def before_request():
    request.start_time = time.time()
    REQUEST_IN_PROGRESS.labels(method=request.method, path=request.path).inc()

@app.after_request
def after_request(response):
    request_latency = time.time() - request.start_time
    REQUEST_COUNT.labels(method=request.method, status=response.status_code, path=request.path).inc()
    REQUEST_LATENCY.labels(method=request.method, status=response.status_code, path=request.path).observe(request_latency)
    REQUEST_IN_PROGRESS.labels(method=request.method, path=request.path).dec()
    return response
```

Let's break down how each custom metric is updated:

- `REQUEST_IN_PROGRESS`: We increment this Gauge at the start of each request and decrement it at the end. This gives us a real-time count of ongoing requests.
- `REQUEST_COUNT`: We increment this Counter at the end of each request, categorizing it by method, status, and path.
- `REQUEST_LATENCY`: We use the `observe` method of this Histogram to record the duration of each request.

For the system metrics (`CPU_USAGE` and `MEMORY_USAGE`), we update them separately:

```python
def update_system_metrics():
    CPU_USAGE.set(psutil.cpu_percent())
    MEMORY_USAGE.set(psutil.Process().memory_info().rss)

@app.route('/metrics')
def metrics():
    update_system_metrics()
    return generate_latest(REGISTRY), 200, {'Content-Type': CONTENT_TYPE_LATEST}
```

Here, we're updating the system metrics just before we generate the metrics response. This ensures that we're providing the most up-to-date system information each time Prometheus scrapes our metrics endpoint.

By implementing our metrics this way, we have full control over what we're measuring and when we're updating those measurements. This level of customization allows us to tailor our monitoring precisely to our application's needs.

# **Running the Application and Sending Traffic**

Now that the application is set up and running, let's send some traffic to it using Postman:

1. Open Postman and import the provided collection `flask-metrics-postman-collection.json`.
2. Use the various requests in the collection to interact with the API:
    - Send GET requests to the root endpoint
    - Create, retrieve, update, and delete items using the `/items` endpoints

# **Observing Metrics**

After sending traffic to the application, let's observe the metrics:

1. In your browser or using a tool like curl, navigate to `http://localhost:5001/metrics`.
2. You'll see a list of all the metrics our application is tracking. Let's break down some key metrics:

```prometheus
# HELP http_request_total Total HTTP Requests
# TYPE http_request_total counter
http_request_total{method="GET",status="200",path="/"} 1.0
http_request_total{method="POST",status="200",path="/items"} 1.0
http_request_total{method="GET",status="200",path="/items/1"} 1.0
http_request_total{method="PUT",status="200",path="/items/1"} 1.0
http_request_total{method="DELETE",status="200",path="/items/1"} 1.0

# HELP http_request_duration_seconds HTTP Request Duration
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{method="GET",status="200",path="/",le="0.005"} 1.0
http_request_duration_seconds_bucket{method="GET",status="200",path="/",le="0.01"} 1.0
...
http_request_duration_seconds_sum{method="GET",status="200",path="/"} 0.00611114501953125
http_request_duration_seconds_count{method="GET",status="200",path="/"} 1.0

# HELP http_requests_in_progress HTTP Requests in progress
# TYPE http_requests_in_progress gauge
http_requests_in_progress{method="GET",path="/"} 0.0

# HELP process_cpu_usage Current CPU usage in percent
# TYPE process_cpu_usage gauge
process_cpu_usage 21.3

# HELP process_memory_usage_bytes Current memory usage in bytes
# TYPE process_memory_usage_bytes gauge
process_memory_usage_bytes 19136512.0
```

- The `http_request_total` counter shows how many requests of each type we've received.
- The `http_request_duration_seconds` histogram provides information about request durations.
- The `http_requests_in_progress` gauge shows how many requests are currently being processed.
- `process_cpu_usage` and `process_memory_usage_bytes` give us insight into our application's resource usage.

These metrics are now exposed in a format that Prometheus can understand and scrape. In future steps, you can set up Prometheus to scrape these metrics at regular intervals, storing them for analysis and visualization. This data can then be used with tools like Grafana to create insightful dashboards, or with Prometheus's built-in alerting to notify you of potential issues before they become critical problems.

By instrumenting your Flask application with Prometheus metrics, you've taken a significant step towards improving your application's observability. This will allow you to monitor performance, track usage patterns, and quickly identify and resolve issues as they arise.

# **Cleanup**

When you're done working on the project:

1. Deactivate the virtual environment:

```bash
deactivate
```

2. Optionally, remove the virtual environment directory:

```bash
rm -rf venv
```