
# SRE Technical Challenge:

## Local Kubernetes Cluster Setup:

Set up a local Kubernetes cluster using Minikube or kind.

Create a namespace called 'sre-challenge'.

# Service Deployment:

## Deploy three services in the 'sre-challenge' namespace:
- A simple Node HTTP API service
- A Redis cache service
- A Prometheus monitoring service

Ensure services can communicate with each other.

Implement basic health checks for each service.

## Instrumentation and Monitoring:

Instrument the Node API service with Prometheus client library.

Configure Prometheus to scrape metrics from the Node API.

Create a custom metric that tracks API response times.

## Chaos Engineering:
Implement a simple chaos engineering scenario:

Randomly kill one of the Node API pods every 5 minutes.

Monitor and document the impact on service availability.

## Bonus:
Set up Grafana and create a dashboard to visualize the custom metric.

Implement auto-scaling for the Node API based on CPU usage.

## Deliverables:
GitHub repository with all code and configuration files.

Brief documentation explaining the setup and any challenges faced.

Screenshots of Prometheus metrics and (if completed) Grafana dashboard.