# Node.js App

## Overview

This is a Node.js application built with Express.js and MongoDB. It includes features like user authentication using JWT, data validation with Yup, and file uploads using AWS S3 signed URLs. The app is containerized using Docker for easy deployment.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Yup** - Schema validation
- **JWT (JSON Web Token)** - Authentication
- **AWS S3 Signed URL** - Secure file uploads
- **Docker** - Containerization

## Installation

### Prerequisites

- Node.js & npm installed
- MongoDB installed and running
- AWS credentials set up for S3 (test keys are provided in the mail)
- Docker installed (optional for containerization)

### Setup

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd <repo-name>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and configure the following variables: (sample values are provided in the email, including aws keys which can be used for testing)
   ```env
    PORT=5000
    MONGO_URI=mongodb_uri
    JWT_SECRET_KEY=secret_key_for_signing_of_jwt
    ADMIN_SECRET_KEY=secret_key_for_admin_account_creation
    AWS_REGION=region_of_s3_bucket
    AWS_ACCESS_KEY=access_key_aws
    AWS_SECRET_ACCESS_KEY=secret_access_key_aws
    AWS_S3_ASSETS_BUCKET=bucket_name_s3
    USER_FRONTEND_URL=url_of_frontend_app
    ADMIN_FRONTEND_URL=url_of_backend_app
   ```

## Running the Application

### Locally

```sh
npm start
```

### With Docker

1. Build the Docker image:
   ```sh
   docker build -t my-node-app .
   ```
2. Run the container:
   ```sh
   docker run -p 5000:5000 --env-file .env my-node-app
   ```

## Feel free to contact me if you have any queries

rameesyounus49@gmail.com
