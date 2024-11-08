# Challenges Faced

## Unknowns going into project
- No experience with running Redis on k8s
- I have not run a node service before, however I do not see any complications with a simple service, as I have used React.
- I have no tried chaos engineering before, this should be exciting!

## Challenges Faced During project
### #1 Challenge
Selecting which node API dependencies to use, Express was selected due to it being recommended to someone
who is familiar with FastApi.

### #2 Challenge
I have never written a Nodejs API endpoint before, good learning curve understanding how the prometheus metrics
scraping was going to happen. Using a "Middleware" function was not something I was familiar with but makes sense
for timing the API calls response time.

### #3 Challenge
Getting images into Minikube is a pain in the backside, I have documented the process so it is easier in the future.

### #4 Challenge
Understanding that the Prometheus service monitor was selecting based on service such as node port/loadbalancer,
got stuck for a while until I understood that it was looking for the label in my loadbalancer service.

### #5 Challenge
During the creation of the Redis pods, my code changes started to not work. At first I thought I was just applying bad
configuration to connect to the Redis cluster, after a while of digging through the configs and my release process I realised
that my changes were not being reflected in the clusters images, only my local images. I'm unsure of why my process of pushing
images into Minikube started randomly failing, however I changed my method to build to the Minikubes Docker Daemon which smoothed out
the process.