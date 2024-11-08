# SRE Challenge

## Table of Contents
***
- [Services](#Services)
- [Requirements](#Requirements)
- [Cluster Creation Overview](#Cluster Creation Overview)
- [Minkube/Docker](#Minkube/Docker)
- [Service Deployment](#Service Deployment)
- [Testing/Using Services](#Testing/Using Services)



## Project Outline
***

### Services:
***
- Node API
- Redis Cache
- Prometheus Monitoring

## Requirements
***
- Docker/Docker Desktop installed
- Minikube installed
- Helm installed

## Cluster Creation Overview
***


## Minkube/Docker
***
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

## Service Deployment
***
**Once you have:**
- minikube cluster running
- node-api image built
- sre-challenge namespace 

You can create the services.
```
# Step 1: Add the Prometheus repo to helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

# Step 2: Add the Redis repo to helm
helm repo add bitnami https://charts.bitnami.com/bitnami

# Step 3: checks for updates
helm repo update

# Step 4: Deploys Prometheus into cluster, values.yaml located in root directory of project
helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml --namespace sre-challenge

# Step 5: Deploys Redis into cluster
helm install my-redis bitnami/redis -n sre-challenge

# Step 6: Deploys Node-api into cluster
helm install node-api chart/
```

## Testing/Using Services
***
Once all services are deployed, you can now see some data by doing the following:

```
# This will give you access to Prometheus dashboard
minikube service prometheus-external -n sre-challenge

# Simple query to show the metrics being scraped on Prometheus
`http_request_duration_seconds_bucket`

# This will give you access to Grafana dashboard
minikube service grafana-external -n sre-challenge`

# This will give you access to the node-api endpoint use /sweet-as-bro or /metrics
minikube service node-api-service -n sre-challenge
```