# AgriLink Backend

AgriLink is a web-based platform connecting farmers and customers directly. The backend utilizes Docker Compose to manage services, including the server, PostgreSQL database, and MinIO bucket.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Usage](#usage)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node](https://nodejs.org/en/download/package-manager)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. **Clone the repository**:
    ```sh
    https://github.com/Safalm74/LF-Major-Project-AgriLink-Backend.git
    cd LF-Major-Project-AgriLink-Backend
    ```

2. **Install dependencies**:
    Ensure you are in the project root directory and run:
    ```sh
    npm install
    ```
3. **Run development server**:
   ```sh
   npm start
 

## Configuration

1. **Environment Variables**:
    Create a `.env` file in the project root directory and configure the necessary environment variables. Refer to the `.env.example` file for required variables.

2. **Docker Compose**:
    The `docker-compose.yml` file is already configured to set up the necessary services (server, PostgreSQL, and MinIO). Adjust the configuration as needed using .env.

## Running the Application

1. **Build and start the services**:
    ```sh
    docker-compose up 
    ```

2. **Stop the services**:
    ```sh
    docker-compose down
    ```

## Usage

You can interact with the backend once the services are up and running.
