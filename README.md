# E-Learning Platform — Spring Boot Microservices + Next.js

A fully cloud-native, microservices-based e-learning system built with Docker, Kubernetes, Kafka, Redis, FFmpeg, and Nginx. Students can stream video content while teachers upload it. Features include real-time chat, email notifications on course booking via Kafka, Redis caching, custom Prometheus metrics, and a full observability stack with Grafana, Loki, Prometheus, and Tempo.

---

## Architecture Overview

```
                       ────────────────────────┐
                      │    Next.js (UI)        │
                      │   my-go-to (Frontend)  │
                      └───────────┬────────────┘
                                  │  HTTP Request
                                  ▼
                      ┌────────────────────────┐
                      │      API Gateway       │
                      └───────────┬────────────┘
                                  │
                                  ▼
                      ┌────────────────────────┐
                      │     Auth-Service       │
                      │ JWT + Role Validation  │
                      └───────────┬────────────┘
                                  │
                      ┌────────────────────────┐
                      │      API Gateway       │
                      └───────────┬────────────┘
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
  ┌───────▼──────┐         ┌──────▼────────┐       ┌──────▼──────┐
  │ Course-      │         │ Stream-       │       │ Chat-       │
  │ Service      │         │ Service       │       │ Service     │
  └──────────────┘         └───────────────┘       └─────────────┘
          │                       │                       │
  ┌───────▼──────┐         ┌──────▼──────┐       ┌────────▼───────┐
  │ Cart-Service │         │ Enrollment  │       │Category-Service│
  │              │         │ Service     │       │                │
  └──────────────┘         └─────────────┘       └────────────────┘
          │                       │                       │
  ┌───────▼──────┐         ┌──────▼──────┐       ┌────────▼──────┐
  │ Review-      │         │ Notify-     │       │ Payment-      │
  │ Service      │         │ Service     │       │ Service       │
  └──────────────┘         └─────────────┘       └───────────────┘
```

> **Note:** See the `adding_k8s` branch for full Kubernetes manifests.

---

## Services Overview

| Service | Description |

| **api-gateway** | Routes HTTP requests from Next.js to all microservices 

| **auth-service** | Manages user registration, login, JWT & Refresh Token generation 

| **cart-service** | Stores add-to-cart data for students 

| **category-service** | Acts as a helper/reference for the Course Service 

| **chat-service** | Real-time communication via WebSocket (group & direct messages) 

| **course-service** | Stores and manages all course-related information 

| **enrollment-service** | Tracks which student is enrolled in which course 

| **notify-service** | Sends email notifications to students after course booking 

| **payment-service** | Handles course purchase and payment processing

| **review-service** | Stores course reviews and ratings |

| **stream-service** | Processes and serves video content via FFmpeg + Nginx 

| **my-go-to** | Next.js frontend (TypeScript) |

---

## Key Features

### Security & Authentication
- **Role-based security** (`STUDENT` / `TEACHER`) enforced across all microservices, including inter-service communication
- **JWT Token** — valid for **1 hour**
- **Refresh Token** — valid for **5 hours**
- Next.js **Middleware** automatically detects JWT expiry, calls `auth-service` with the Refresh Token, and silently obtains a new JWT
- **Server-side logic** in Next.js for login, signup, and token refresh — JWT stored securely in **cookies** with proper timestamps

### Real-Time Communication
- **Group Discussion** — WebSocket-powered group chat per course
- **Comment Liking** — real-time like/unlike on discussion threads
- **Direct Messaging** — private WebSocket-based DMs between users

### Video Streaming
- Videos processed using **FFmpeg** for adaptive streaming
- Served efficiently via **Nginx** in the Stream Service

### Event-Driven Notifications
- **Apache Kafka** with Schema Registry handles asynchronous events
- Students receive **email notifications** upon successful course enrollment

### Caching
- **Redis** used for high-performance caching to reduce database load

### Testing
- **Unit and Integration Tests** implemented in `enrollment-service` and `payment-service`

### CI/CD & Deployment
- **GitHub Actions** for automated CI/CD pipelines
- Frontend and backend packaged as **Docker images**
- Deployed and orchestrated with **Kubernetes (K8s)**

---

## Observability Stack

The platform includes a full observability stack integrated with **Grafana**, giving you metrics, logs, and traces in a single pane of glass.

### Prometheus — Metrics
- All microservices expose a `/actuator/prometheus` endpoint
- Prometheus scrapes metrics from every service at configurable intervals
- **Custom counters** have been added to track:
  - Total number of users who **viewed a course**
  - Total number of users who **enrolled in a course**
- These custom metrics are registered as Prometheus `Counter` beans and incremented on each relevant API call

Example custom metric names:
```
course_count_total          # incremented each time a course detail page is fetched
enroll_count_total          # incremented each time a student successfully enrolls
```

### Loki — Log Aggregation
- **Grafana Loki** collects structured logs from all services

### Tempo — Distributed Tracing
- **Grafana Tempo** receives traces from all microservices via **OpenTelemetry**

### Grafana — Unified Dashboard
- **Grafana** serves as the single observability UI

Access Grafana :
```bash
# http://localhost:3000
```


---

## Application Glimpse

![Course Listing](https://github.com/BasantaNembang/Final-Year-Project/blob/cd74fd480a3715c5a3a65734a8cbba2aca2ce32e/course.png)

![Course Detail](https://github.com/BasantaNembang/Final-Year-Project/blob/cd74fd480a3715c5a3a65734a8cbba2aca2ce32e/course1.png)

![Enrollment Flow](https://github.com/BasantaNembang/Final-Year-Project/blob/cd74fd480a3715c5a3a65734a8cbba2aca2ce32e/course2.png)

![Video Streaming](https://github.com/BasantaNembang/Final-Year-Project/blob/cd74fd480a3715c5a3a65734a8cbba2aca2ce32e/course3.png)

![Chat Interface](https://github.com/BasantaNembang/Final-Year-Project/blob/cd74fd480a3715c5a3a65734a8cbba2aca2ce32e/course4.png)

---


##  How to run the services
Make sure you have the following installed on your machine:
  - Docker Desktop 
  - kubectl

##

##  Start Minikube cluster

```bash
minikube start --driver=docker --cpus=3 --memory=13312
```
Run Kubernetes locally inside Docker, and give it 3 CPUs and 13 GB of RAM so it has enough power for this project.

## Deploy the infrastructure

```bash
kubectl apply -f /infra
```

## Deploy the services

```bash
kubectl apply -f /apps
```

##  MAKE SURE YOU ARE INSIDE  k8s  FOLDER

##

##  Check the Deployment

```bash
kubectl get all
```

If all the pods, deployment and services are fine then you are good to go, else wait for  
pods to be UP.

## Access the API Gateway

To access the API Gateway, you need to port-forward the gateway service to your local machine

```bash
kubectl port-forward svc/api-gateway-svc 9090:9090
```
## Enable Chat-Service

```bash
kubectl port-forward svc/chat-service-svc 8090:8090
```

## Enable Streaming

```bash
kubectl port-forward svc/nginx-svc 9292:9292
```
## To run Frontend

```bash
kubectl port-forward svc/my-go-to 3001:3000
```
After port-forwarding go to this URL, your all services and frontend is ready now....
```bash
http://localhost:3001/
```


