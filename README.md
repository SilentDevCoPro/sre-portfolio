# SRE Challenge

## Project Outline

### Services:
- Node API
- Redis Cache
- Prometheus Monitoring

## Requirements
- Docker/Docker Desktop installed
- Minikube installed
- Helm installed

## Setup Guide

### Minkube/Docker
The following steps in Minikube/Docker are only required because this setup has only been tested using a local Docker 
image registry.

Create the namespace: `kubectl create namespace sre-challenge`

Use Docker Driver: `minikube start --driver=docker`

Use Docker environment from Minikube, must be done before building the image: `minikube docker-env`

This next command minikube should give you, it will state "To point your shell to minikube's Docker Daemon, it must be run every
time your session is closed."

` & minikube -p minikube docker-env --shell powershell | Invoke-Expression`

Now you can build the images and using the Minikube Docker Daemon

`docker build -t 'image-name .`

### Prometheus/Grafana
Add repo and update

`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts`

`helm repo update`

`helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml --namespace sre-challenge`

### Redis
Add repo and update
`helm repo add bitnami https://charts.bitnami.com/bitnami`

`helm repo update`

`helm install my-redis bitnami/redis -n sre-challenge`

### Node API
Creates config for Node API to work

`helm install node-api chart/`

### Testing/Using Services
Access the services once added

`minikube service prometheus-external -n sre-challenge`

`minikube service grafana-external -n sre-challenge`

`minikube service node-api-service -n sre-challenge`

Simple query to show the metrics being scraped on Prometheus

`http_request_duration_seconds_bucket`