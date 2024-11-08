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
Build images locally

`docker build -t 'image-name .`

### Minkube
`kubectl create namespace sre-challenge`

`minikube start --driver=docker`

`minikube docker-env`

This next command minikube should give you, it will state "To point your shell to minikube's docker-daemon, run:"

` & minikube -p minikube docker-env --shell powershell | Invoke-Expression`

Now you should be able to push your images to minikube

`minikube image load node-api:latest`

To access the node-api from the loadbalancer:

`minikube service node-api-service -n sre-challenge`

### Prometheus/Grafana
Add repo and update

`helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update`

Install into k8s cluster

`helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml --namespace sre-challenge
`

Access the services once added

`minikube service prometheus-external -n sre-challenge`

`minikube service grafana-external -n sre-challenge`

Simple query to show the metrics being scraped

`http_request_duration_seconds_bucket`