# Clothet-API

![](https://travis-ci.org/Clothet/Clothet-API.svg?branch=master)
  
API server for Clothet 

## Set-up

```bash
$ cp config/development-config.js local.js
$ vim config/local.js # fill in data
$ npm start
```

## Initial database

Use the initial script to create database

```bash
$ mysql -e 'CREATE DATABASE clothet;'
$ node scripts/init_mysql_tool.js <force?> # 0 or 1
```

## Coding-Style

We use [eslint](https://github.com/eslint/eslint) and [jscs](https://github.com/jscs-dev/node-jscs) to maintain consistency coding-style.
  
Run lint command to make sure all style are fine before commited.

```bash
$ npm run lint
$ npm run jscs 
```

## Unit Test

Make sure don't break anything by running unit-test before commit.

```bash
$ npm test
```