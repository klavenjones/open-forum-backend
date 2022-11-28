
# Description

A backend Server API for the Open Forum Application built with [Nest](https://github.com/nestjs/nest)

# Installations

## Install PostgreSQL 

*Version 14.3 was used when building this project*

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


## Install Project

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



# Environment Set Up


## Set up Database

### Start Postgres (If not using the Postgres.app)

```bash

brew services start postgres
```

### Create Database


In order to run the project locally with ``TypeORM`` requires an existing database. To create a database with Postgres. You can run this command to create a database.


Run this command when you arent connected to postgres via Terminal:

```bash

createdb -U <username> <databasename>
```

*Usually the default username is the name you currently use to log into your laptop* 


Run this command If connected to postgres via Terminal you can run an SQL Query

```bash

CREATE DATABASE <Databasename>
```

Here is a good guide for connecting to Postgres

[Connect to Postgres Guide](https://www.prisma.io/dataguide/postgresql/connecting-to-postgresql-databases#basic-information-about-the-psql-client)



### Migrations 

Support coming soon.


# Environment Variables

For local development, You can duplicate .env.example located file and rename it to .development.env or .env


```bash

# src/common/.env.example

PORT=3000
BASE_URL=http://localhost:3000

DATABASE_HOST=<Your db host>
DATABASE_NAME=<Your db name>
DATABASE_USER=<Your DB Username>
DATABASE_PASSWORD=<Your DB Password>
DATABASE_PORT=<Your DB Port>

```

---


# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
---
# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

---

# Commitizen

[commitizen](https://github.com/commitizen/cz-cli) is a command line utility that makes it easier to create commit messages following the [conventional commit format](https://conventionalcommits.org) specification.

Use `git cz` instead of `git commit` to use commitizen.

**Note** If there is an issue running it in VS CODE use the command `npx cz`

[![Add and commit with Commitizen](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)](https://github.com/commitizen/cz-cli/raw/master/meta/screenshots/add-commit.png)

**Configuration file**: [`.czrc`](./.czrc).

---

# Linting & Formatting


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

