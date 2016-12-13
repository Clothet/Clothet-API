var sslEnabled = false;
var path = require('path');

module.exports = {

    enviroment: "development",

    port: (process.env.PORT || 3000),

    middleware: {
        view_cache: false,
        logger_dev: true,
        less: false
      },

    model: {
        mysql: {
            database: "DATABASE",
            account: "ACCOUNT",
            password: "PASSWORD",
            options: {
                host: "127.0.0.1",
                logging: console.log,
                dialect: 'mysql',
                define: {
                    charset: 'utf8',
                    collate: 'utf8_general_ci'
                  }
              }
          },
      },

    session: {
        redis: {
            host: 'localhost',
            port: 6379
          }
      }
  };
