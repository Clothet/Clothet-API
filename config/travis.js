var sslEnabled = false;
var path = require('path');

module.exports = {

    enviroment: "travis",

    port: (process.env.PORT || 3000),

    middleware: {
        view_cache: false,
        logger_dev: false,
        less: false
    },

    model: {
        mysql: {
            database: "clothet",
            account: "travis",
            password: "",
            options: {
                host: "127.0.0.1",
                logging: false,
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
