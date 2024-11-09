# SRE Challenge

## Table of Contents
***
- [Requirements](#requirements)
- [Cluster Creation Overview](#cluster-creation-overview)
- [Minkube/Docker](#minkubedocker)
- [Service Deployment](#service-deployment)
- [Testing/Using Services](#testing-using-services)

## Requirements
***
- Docker/Docker Desktop installed
- Minikube installed
- Helm installed

## Cluster Creation Overview
***
The idea of this cluster is to demonstrate my knowledge of k8s infrastructure and deployment of services.
This demo shows:
- Simple Nodejs API service which has a /sweet-as-bro endpoint and a /metrics endpoint
- Prometheus to scrape /metrics endpoint, collecting the duration of the /sweet-as-bro response time. 
- Redis Cache which the Node API can Hit or Miss when the /sweet-as-bro endpoint is requested.


## Minkube/Docker
***
The following steps in Minikube/Docker are only required because this setup has only been tested using a local Docker 
image registry.

``` 
# Create the namespace: 
kubectl create namespace sre-challenge

# Telling Minikube to use the Docker Driver: 
minikube start --driver=docker

# Use Docker environment from Minikube
minikube docker-env

# This next command minikube should give you, it will state "To point your shell to minikube's Docker Daemon, 
# it must be run every time you start a new terminal session"
& minikube -p minikube docker-env --shell powershell | Invoke-Expression

Now you can build the images and using the Minikube Docker Daemon located in /node_service directory
docker build -t 'image-name .

# If you want Auto Scaling to work enable metrics server
minikube addons enable metrics-server
```

## Services Deployment
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
helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml -n sre-challenge

# Step 5: Deploys Redis into cluster
helm install my-redis bitnami/redis -n sre-challenge

# Step 6: Deploys Node-api into cluster
helm install node-api chart/ -n sre-challenge
```

## Testing Services
***
Once all services are deployed, you can now see some data by doing the following:

```
# This will give you access to Prometheus dashboard
minikube service prometheus-external -n sre-challenge

# Simple query to show the metrics being scraped on Prometheus
http_request_duration_seconds_bucket

# This will give you access to Grafana dashboard
minikube service grafana-external -n sre-challenge

# This will give you access to the node-api endpoint use /sweet-as-bro or /metrics
minikube service node-api-service -n sre-challenge

# To test autoscaling you can install stress into a pod once you exec into it, after the stress has run for a while the
# deploy should scale out by +1
kubectl exec -it <pod-name> -n sre-challenge -- /bin/sh
apt update
apt install stress
stress --cpu 4 --io 2 --vm 2 --vm-bytes 512M

```