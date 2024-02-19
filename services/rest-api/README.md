# REST API Service

## Introduction

This REST API service is a core component of our service-oriented architecture, designed to provide a scalable and efficient way to handle web requests. It serves as a backend service, offering a set of predefined API endpoints for performing operations related to items management.

## Getting Started

### Prerequisites

- Node.js (Version 14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository to your local machine:
   \```
   git clone <repository-url>
   \```
2. Navigate to the `rest-api` directory:
   \```
   cd rest-api
   \```
3. Install the necessary dependencies:
   \```
   npm install
   \```
   or if you use yarn:
   \```
   yarn
   \```

## Running the Service

To start the service in development mode, run:
\```
npm run dev
\```
or with yarn:
\```
yarn dev
\```
This will start the application and list all available routes using `express-list-routes`.

## Environment Setup

Our service supports different environments for development, testing, and production. These are controlled through the `NODE_ENV` environment variable.

- **Development**: Set `NODE_ENV=development` for development settings.
- **Production**: Set `NODE_ENV=production` for production settings.
- **Testing**: Set `NODE_ENV=test` to run the tests.

To configure environment variables, create a `.env` file for development or production environments and `.env.test` for testing. 

## Running in Different Modes

### Development Mode

In development mode, features like hot reloading are enabled. Run the service with:
\```
npm run dev
\```

### Production Mode

For production, first build the application with:
\```
npm run build
\```
Then start it with:
\```
npm start
\```

### Test Mode

To execute tests, including unit and integration tests, use:
\```
npm test
\```

### Dry Run Mode

A dry run can be performed to ensure environment configuration is correct. Set `DRY_RUN=Y` and start the application. It will not start the web server but will perform initial setup checks.

## Testing

We use `chai`, `chai-http`, and `sinon` for testing. To add tests for new API endpoints, create a test file under `src/api-server/` and follow the structure used in existing tests.

## API Documentation

### Endpoints

- **GET /api/hello_world**: Returns a simple `Hello, World` message.
- **GET /api/v1/items**: Returns a list of items.

## Environment Variables

- **API_PORT**: Port on which the REST API will listen.
- **NODE_ENV**: Should be set automatically in node scripts. Determines the environment the application runs in (`development`, `test`, `production`).
- **DRY_RUN**: Should be set automatically in node scripts. If set to `Y`, performs a dry run without starting the server.
- **IS_NATIVE**: Should be set automatically in node scripts.  If set to `Y`, reads environment variables from a `.env` file.

