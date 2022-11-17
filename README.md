## Description

A backend Server API for the Open Forum Application built with [Nest](https://github.com/nestjs/nest)

## Installation

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

## Environment Variables

For local developmebt, You can duplicate .env.example located file and rename it to .development.env or .env

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
