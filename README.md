# SRE Challenge

## Table of Contents
***
- [Requirements](#requirements)
- [Overview](#overview)
- [Minkube/Docker](#minkubedocker)
- [Deployment of Services](#deployment-of-services)
- [Testing Services](#testing-services)

## Requirements
***
- Docker/Docker Desktop installed
- Minikube installed
- Helm installed

## Overview
***
The idea of this cluster is to demonstrate my knowledge of k8s infrastructure and deployment of services.
This demo shows:
- Simple Nodejs API service which has a /sweet-as-bro endpoint and a /metrics endpoint
- Prometheus to scrape /metrics endpoint, collecting the duration of the /sweet-as-bro response time
- Redis Cache which the Node API can Hit or Miss when the /sweet-as-bro endpoint is requested


## Minkube/Docker
***
The following steps in Minikube/Docker are only required because this setup has only been tested using a local Docker 
image registry.

``` 
# Create the namespace
kubectl create namespace sre-challenge

# Telling Minikube to use the Docker Driver
minikube start --driver=docker

# Use Docker environment from Minikube
minikube docker-env

# Minikube will give you a command which will point your terminal to the Docker Daemon in Minikube, 
# the command must be run every time you start a new terminal session
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

Now you can build the image using the Docker image located in /node_service directory
docker build -t 'image-name .

# If you want Auto Scaling, enable metrics server using the following command
minikube addons enable metrics-server
```

## Deployment of Services
***
**Once you have:**
- minikube cluster running
- node-api image built
- sre-challenge namespace 

You can create the services with the following steps:
```
# Step 1: Add the Prometheus repo to helm
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts 

# Step 2: Add the Redis repo to helm
helm repo add bitnami https://charts.bitnami.com/bitnami

# Step 3: check for updates
helm repo update

# Step 4: Deploy Prometheus into cluster values.yaml located in root directory of project
helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml -n sre-challenge

# Step 5: Deploy Redis into cluster
helm install my-redis bitnami/redis -n sre-challenge

# Step 6: Deploy Node-api into cluster
helm install node-api chart/ -n sre-challenge
```

## Testing Services
***
Once all services are deployed, the following options become available:

```
# Access to Prometheus dashboard
minikube service prometheus-external -n sre-challenge

# Simple query to show the metrics being scraped on Prometheus
http_request_duration_seconds_bucket

# Access to Grafana dashboard
minikube service grafana-external -n sre-challenge

# Access to the node-api endpoint use /sweet-as-bro or /metrics
minikube service node-api-service -n sre-challenge

# To test autoscaling, you can install stress into a pod once you exec into it. After stress has run for a while the
# deploy should scale out
kubectl exec -it <pod-name> -n sre-challenge -- /bin/sh
apt update
apt install stress
stress --cpu 4 --io 2 --vm 2 --vm-bytes 512M

```