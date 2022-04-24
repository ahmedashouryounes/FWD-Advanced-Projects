# Storefront Backend Project

A StoreFront backend API written in NodeJS for Udacity. This application has APIs for Users, Products, and Orders.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

### Prerequisites

You need the following modules and dependencies installed to run this project:

```bash
docker-compose   # To run the Postgres database on Docker
node 12          # To run the application
npm             # For dependency management
```

### Installing

Simply, run the following command to install the project dependencies:

```bash
npm i
```

### Setup environment

First, create a `.env` file with all the required environment variables:

```bash
# .env
ENV=dev
PORT=3000

# Set your database connection information here

POSTGRES_HOST=127.0.0.1
POSTGRES_DB=mystore_dev
POSTGRES_TEST_DB=mystore_test
POSTGRES_USER=admin
POSTGRES_PASSWORD=password123

# user

BCRYPT_PASSWORD=ah15454
SALT_ROUNDS=10
TOKEN_SECURE=as45644

```

now, to check database:

### DB Configurations

We shall create the dev and test database.

-   connect to the default postgres database as the server's root user `psql -U postgres`
-   In psql run the following to create a user
    -   `CREATE USER ashour WITH PASSWORD 'password123';`
-   In psql run the following to create the dev and test database
    -   `CREATE DATABASE mystore_dev;`
    -   `CREATE DATABASE mystore_test;`
-   Connect to the databases and grant all privileges
    -   Grant for dev database
        -   `\c mystore_dev`
        -   `GRANT ALL PRIVILEGES ON DATABASE mystore_dev TO ashour;`
    -   Grant for test database
        -   `\c mystore_test`
        -   `GRANT ALL PRIVILEGES ON DATABASE mystore_test TO ashour;`

Next, you need to run the database migrations:

```bash
db-migrate up
```

## Running the application

Use the following command to run the application in watch mode:

```bash
npm run dev
```

Use the following command to run the application in using node:

```bash
npm run start
```

The application will run on <http://localhost:3000/>.

## Running the unit tests

Use the following command to run the unit tests:

```bash
npm run test
```
