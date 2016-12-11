# Clothet-API

API server for Clothet

# Set-up

```bash
$ cp config/development-config.js local.js
$ vim config/local.js # fill in data
$ npm start
```

# Initial database

use the initial script to create database

```bash
$ node scripts/init_mysql_tool.js <force?> # 0 or 1
```