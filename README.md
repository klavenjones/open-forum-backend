# Description

A backend Server API for the Open Forum Application built with [Nest](https://github.com/nestjs/nest)

## Installations

### Install PostgreSQL

_For your information: Version 14.3 was used when building this project, it is not required._

An easy way to install various PostgreSQL version is to install [Postgres.app](https://postgresapp.com/).

If you prefer to install it using Hombrew run this command

```sh
brew install postgresql
```

Check to see if postgres installed successfully by running either of these commands.

```sh

postgres -V
```

or

```sh

psql -V
```

### Install Project

Clone the git repository

```bash
git clone https://github.com/klavenj/open-forum-backend.git
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

To run this application locally, the first step is to create a local .env file and set the environment variables with the appropriate values. You can duplicate .env.example file and rename it to .env

```bash

# src/common/.env.example

PORT=3000
BASE_URL=http://localhost:3000

DATABASE_HOST=<Your Database host>
DATABASE_NAME=<Database name, choose a name for your local database environment, this will be created automatically, when running the db:setup command>
DATABASE_USER=<Your Database username, choose a name for the database role. A role will be created automatically based on what you add here>
DATABASE_PASSWORD=<Your Database Password, choose a password, this is optional when creating a role for your local database>
DATABASE_PORT=<Your Database Port>


Created for local testing, and CI environments. Locally, you can add the same values as above. But these values will be different when running tests in the github actions workflow.

TEST_DATABASE_NAME=
TEST_DATABASE_HOST=
TEST_DATABASE_USER=
TEST_DATABASE_PORT=
TEST_DATABASE_PASSWORD=

```

---

## Set up Database

### Create Database

In order to use `TypeORM`, it requires the database to be initialized before you can connect to it. You can run this command to setup your database

Run this command:

```bash

npm run db:setup
```

First this will run the `database/setup.ts` file, which will create a role for your local database, drops the database if it exists and creates a new one. Then it runs the latest migration to populate the database.

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
