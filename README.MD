# Dockerized Node.js API

A simple Node.js and Express REST API containerized with Docker and published to Docker Hub.

## Project Overview

This project demonstrates the basic Docker workflow:

```text
Application Code
      ↓
Dockerfile
      ↓
Docker Image
      ↓
Docker Container
      ↓
Docker Hub
```

The API contains a health-check endpoint that can be used to verify whether the application is running correctly.

## Technologies

* Node.js
* Express
* Docker
* Docker Hub

## Project Structure

```text
docker-api-lab/
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## API Endpoints

### GET /

Returns a simple confirmation message.

Example response:

```json
{
  "message": "Docker API is running!"
}
```

### GET /health

Health-check endpoint used to confirm that the API is running.

Example response:

```json
{
  "status": "ok"
}
```

## Dockerfile

The application uses the following Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

The Dockerfile:

* Uses Node.js 20 Alpine as the base image.
* Creates `/app` as the working directory.
* Copies the Node.js dependency files.
* Installs the application dependencies.
* Copies the application source code.
* Documents port 3000 as the application port.
* Starts the Node.js API when the container starts.

## Build the Docker Image

From the project directory, run:

```bash
docker build -t my-api .
```

Verify that the image was created:

```bash
docker images
```

## Run the Container

Run the application locally:

```bash
docker run -d -p 3000:3000 --name my-api-container my-api
```

The API will be available at:

```text
http://localhost:3000
```

Health endpoint:

```text
http://localhost:3000/health
```

## Check Running Containers

```bash
docker ps
```

## View Container Logs

```bash
docker logs my-api-container
```

## Stop the Container

```bash
docker stop my-api-container
```

## Remove the Container

```bash
docker rm my-api-container
```

## Docker Hub

Tag the image before publishing:

```bash
docker tag my-api YOUR_DOCKERHUB_USERNAME/my-api:latest
```

Log in to Docker Hub:

```bash
docker login
```

Push the image:

```bash
docker push YOUR_DOCKERHUB_USERNAME/my-api:latest
```

The published image can then be downloaded using:

```bash
docker pull YOUR_DOCKERHUB_USERNAME/my-api:latest
```

And executed with:

```bash
docker run -d -p 3000:3000 YOUR_DOCKERHUB_USERNAME/my-api:latest
```

## Docker Workflow

```text
server.js
    │
    ↓
Dockerfile
    │
    │ docker build
    ↓
Docker Image
    │
    │ docker run
    ↓
Docker Container
    │
    │ docker push
    ↓
Docker Hub
```

## What I Learned

This project demonstrates:

* How to create a simple REST API with Node.js and Express.
* The difference between Docker images and containers.
* How to create a Dockerfile.
* How Docker image layers and build caching work.
* How to use `.dockerignore`.
* How Docker port mapping works.
* How to build and run containers locally.
* How to tag Docker images.
* How to publish images to Docker Hub.
* How to pull and run an image from a container registry.
