# Description

A backend Server API for the Open Forum Application built with [Nest](https://github.com/nestjs/nest)

## Installations

### Install PostgreSQL

_For your information: We recommend using version 14.3 as this project was built with this version._

An easy way to install various PostgreSQL version is to install [Postgres.app](https://postgresapp.com/).

If you prefer to install it using Hombrew run this command

```sh
brew install postgresql
```

Check if postgres is installed successfully by running either of these commands.

```sh

postgres -V
```

or

```sh

psql -V
```

Here are other helpful articles you can check out when installing and connecting to Postgres:

1. [MacOS installation](https://tecadmin.net/install-postgresql-on-macos/)
2. [Windows installation](https://commandprompt.com/education/how-to-download-and-install-postgresql/)
3. [Linux](https://www.digitalocean.com/community/tutorials/how-to-install-postgresql-on-ubuntu-22-04-quickstart)

For more information on installing postgres, you can look here: [Postgres Download](https://www.postgresql.org/download/)

After connecting to postgres from the command line/terminal here is the command to list the current users in your system.

```sh
postgres=#\du
```

### Install Project

Clone the git repository

```bash
git clone https://github.com/klavenjones/open-forum-backend.git
```

Go into the project directory

```bash

cd open-forum-backend/
```

Checkout working branch

```bash

git checkout -b <branch>
```

Install NPM dependencies

```bash

npm i
```

---

## Environment Set Up

### Environment Variables

To run this application locally, the first step is to create a local .env file in the root of the project and set the environment variables with the appropriate values. You can duplicate .env.example file and rename it to .env

_Please note, in order run this project with your local database, you need an existing postgres username, and password. Some machines will have a superuser by default, when installed, but there may be cases where you need to create a role for postgres_.

_Please note, in order run this project with your local database, you need an existing postgres username, and password. Some machines will have a superuser by default, when installed, but there may be cases where you need to create a role for postgres_.

```bash

# src/common/.env.example

BASE_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:5173 - Set this to the client\'s URL making the request to this server

DATABASE_HOST=<This should be the database Hostname, for example, this would be set to localhost, when running this locally>
DATABASE_NAME=<Database name - This will be the name of the database you will work with in this environment>
DATABASE_USER=<Your Database username - Must be created in Postgres already, this can be a default role, or a role you have created>
DATABASE_PASSWORD=<Must be created in Postgres already, if the Postgres role you selected has a password, you must add it here.>
DATABASE_PORT=<Your Database Port - Default Port for postgres is 5432>


Created for local testing, and CI environments. Locally, you can add the same values as above. But these values will be different when running tests in the github actions workflow.

TEST_DATABASE_NAME=
TEST_DATABASE_HOST=
TEST_DATABASE_USER=
TEST_DATABASE_PORT=
TEST_DATABASE_PASSWORD=



JWT_SECRET=<Add a jwt secret for authentication>

```

---

## Set up Database

### Create Database

In order to use `TypeORM`, it requires the database to be initialized before you can connect to it. You can run this command to setup your database

Run this command:

```bash

npm run db:setup
```

First this will run the `database/setup.ts` file, which will drop the database if it exists and create a new one. Then it runs the latest migration to populate the database.

### Migrations

Run Migrations

```bash

npm run typeorm:run-migrations
```

Create Migration

```bash

npm run typeorm:create-migration --name=<Migration name>
```

Generate Migration

```bash

npm run typeorm:generate-migration --name=<Migration name>
```

**_Note_**: Custom --name option flag will only work using NPM. It will not work with yarn.

Show Migrations

```bash

npm run typeorm:show-migrations
```

Revert Migration

```bash

npm run typeorm:revert-migrations
```

All of these commands leverage the TypeORM cli tool that comes installed with the TypeORM npm package.

In order to run the cli, without installation, you can use:

```bash

npm run typeorm
```

**Note:** The migration commands leverage the typeorm/typeorm.config-migrations.ts file.

For more information about TypeORM checkout the [docs](https://typeorm.io/)

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

---

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

## Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `git cz` instead of `git commit` to use commitizen.

**Note** If there is an issue running it in VS CODE use the command `npx cz`

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

**Configuration file**: [`.czrc`](./.czrc).

---

## Linting & Formatting

To check the linting in your code run:

```bash
npm run lint
```

To format the code run:

```bash
npm run prettier:write
```

To check for any prettier violations run:

```bash
npm run prettier:check
```
