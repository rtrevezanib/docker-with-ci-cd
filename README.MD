# Dockerized Node.js API

![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)

A simple Node.js and Express REST API, containerized with Docker and published to Docker Hub.

## Overview

This project demonstrates the core Docker workflow, from source code to a published image:

```
server.js
   │
   ▼
Dockerfile
   │  docker build
   ▼
Docker Image
   │  docker run
   ▼
Docker Container  ──►  http://localhost:3000
   │  docker push
   ▼
Docker Hub
```

The API includes a health-check endpoint used to verify that the application is running correctly.

## Technologies

- Node.js
- Express
- Docker
- Docker Hub

## Project Structure

```
docker-api-lab/
├── server.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── .gitignore
└── README.md
```

## Prerequisites

- [Docker](https://www.docker.com/) installed and running
- A [Docker Hub](https://hub.docker.com/) account (only needed to publish the image)

## API Endpoints

### `GET /`

Returns a simple confirmation message.

```json
{
  "message": "Docker API is running!"
}
```

### `GET /health`

Health-check endpoint used to confirm that the API is running.

```json
{
  "status": "ok"
}
```

## Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

What it does:

- Uses Node.js 20 Alpine as the base image (small footprint).
- Sets `/app` as the working directory.
- Copies dependency files first and installs them, so Docker can cache this layer separately from the source code.
- Copies the rest of the application source code.
- Documents port 3000 as the port the app listens on.
- Starts the API when the container runs.

## Build the Image

```bash
docker build -t my-api .
```

Verify it was created:

```bash
docker images
```

## Run the Container

```bash
docker run -d -p 3000:3000 --name my-api-container my-api
```

The API will be available at `http://localhost:3000`, and the health check at `http://localhost:3000/health`.

**Useful commands:**

```bash
docker ps                        # list running containers
docker logs my-api-container     # view container logs
docker stop my-api-container     # stop the container
docker rm my-api-container       # remove the container
```

## Publish to Docker Hub

```bash
docker tag my-api YOUR_DOCKERHUB_USERNAME/my-api:latest
docker login
docker push YOUR_DOCKERHUB_USERNAME/my-api:latest
```

Once published, anyone can run it without the source code:

```bash
docker pull YOUR_DOCKERHUB_USERNAME/my-api:latest
docker run -d -p 3000:3000 YOUR_DOCKERHUB_USERNAME/my-api:latest
```

🔗 [View on Docker Hub](https://hub.docker.com/r/rtrevezanib/my-api)

## What I Learned

- How to build a simple REST API with Node.js and Express.
- The difference between Docker images and containers.
- How to write a Dockerfile and structure its layers.
- How Docker build caching works.
- How `.dockerignore` keeps images lean.
- How Docker port mapping works.
- How to build, run, and manage containers locally.
- How to tag and publish images to Docker Hub.
- How to pull and run an image from a public registry.

## Author

**Renan** — [GitHub](https://github.com/rtrevezanib) 
