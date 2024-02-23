# Monorepo for Microservices Architecture

## Overview

This monorepo houses a collection of services that together form a comprehensive microservices architecture. It includes backend services, a frontend client, and infrastructure management tools. The goal of this architecture is to provide a scalable, efficient, and robust system for modern web applications.

### Services and Status

-   **api-gateway**: Not started. An entry point for all openly accessible endpoints
-   **rest-api**: Work in progress. A RESTful API service providing backend functionality.
-   **psql**: Not started. A PostgreSQL database service for data persistence.
-   **message-broker**: Not started. A messaging service for inter-service communication.
-   **react-client**: Not started. A React-based frontend client.
-   **infrastructure**: Started. Contains CloudFormation templates and Docker-compose files for infrastructure as code (IaC) and local development setup.
-   **auth-service**: Planned. Will handle authentication and authorization across the system.

## Getting Started

To get started with this monorepo, you'll need to have Docker, Node.js, and Yarn installed on your system for local development and testing.

### Initial Setup

1. Clone the repository:
   \```sh
   git clone <repository-url>
   \```

2. Navigate into the monorepo directory:
   \```sh
   cd <monorepo-directory>
   \```

3. Install dependencies for each service (where applicable):
   \```sh
   cd <service-directory>
   npm install
   \```

### Running Locally

-   For services that are started (like `infrastructure`), you can use Docker-compose to spin up the local development environment:
    \```sh
    docker-compose up
    \```

Please adhere to the coding standards and guidelines provided in the `CONTRIBUTING.md` file.

## Infrastructure and Deployment

-   **Local Development**: Use Docker-compose files located within the `infrastructure` directory for local service orchestration.
-   **Deployment**: CloudFormation templates are provided for deploying to AWS. Ensure you have the necessary AWS credentials configured before attempting deployment.

# TODO list

## Next up


-   Make new services / packages structure pass tests + lints

-   migrate ./services/rest-api/environment to ./packages/environment
-   set up auth service

## Done

-   [x] Rest-api: Be able to run on nodemon in dev (native)
-   [x] Rest-api: Environment module
-   [x] Rest-api: Set up express route
-   [x] Rest-api: Set up workflow
-   [x] Rest-api: Be able to run unit tests
-   [x] Rest-api: Be able to run api tests
-   [x] Rest-api: Be able to run all tests

### Rest-api

-   [ ] Swagger
-   [ ] Set up console logger
-   [ ] Basic @Controller (status codes, error handling, status codes,)
-   [ ] Models (simple TODO table)
-   [ ] Set up models for dummy schema

### Psql

-   [ ] Start set up
-   [ ] Simple TODO table
-   [ ] Add users table

### Authservice

-   [ ] Start set up

### Api server

-   [ ] set this up simply
-   [ ] What is a metadata driven way of handling routing? Ideally just forward everything to "/foobar" to service foobar "/\*"
-   [ ] Authentication on routes

## Figure out how to do these things:

-   [ ] Setup logging (splunk)
-   [ ] Setup snowflake logging
-   [ ] Setup alerts for logs (not sure)
-   [ ] Setup Some dashboard (grafana?)
-
-
-   ...
-   [ ] Dry run
