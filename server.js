'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const _ = require('lodash');
const compression = require('compression');
const morgan = require('morgan');
const serveStatic = require('serve-static');
const errorhandler = require('errorhandler');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const csurf = require('csurf');
const cors = require('cors');

const config = require('./config/local');

const COOKIE_SECRET = 'cjdehrenmj43kife3r3';
const SESSION_SECRET = 'kdwnksjwlp9812,;xd';

exports = module.exports = function(options) {
    const app = express();
    const env = app.get('env');
    const PRODUCTION = env === 'production';

    app.use(errorhandler({
        dumpExceptions: !PRODUCTION,
        showStack: !PRODUCTION
    }));

    app.use(cors());

    options = _.extend({
        log: true,
        csrf: false 
    }, options);

    // Configuration
    app.locals.config = config;

    if (PRODUCTION) {
        app.enable('view cache');
    }

    // Body parser
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: false
    }));

    // Method override
    app.use(methodOverride('_method'));

    // Logger
    if (options.log) {
        const logFormat = typeof options.log === 'string' ? options.log : 'dev';
        app.use(morgan(logFormat));
    }

    // Serve static files
    app.use(serveStatic(path.join(__dirname, 'views'), {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }));

    // Compression
    app.use(compression());

    // Cookie parser
    app.use(cookieParser(COOKIE_SECRET));

    // Session
    app.use(session({
        store: new RedisStore(config.session.redis),
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
        }
    }));

    // CSRF
    if (options.csrf) {
        app.use(csurf());

        app.use(function(req, res, next) {
            if (req.session.isLogin && req.cookies.ca !== 'true') {
                res.cookie('ca', 'true');
            } else if (!req.session.isLogin && req.cookies.ca) {
                res.clearCookie('ca');
            }

            res.cookie('XSRF-TOKEN', req.csrfToken());
            next();
        });

      // CSRF error handler
        app.use(function(err, req, res, next) {
            if (err.code !== 'EBADCSRFTOKEN') {
                return next(err);
            }

          // handle CSRF token errors here
            res.status(403);
            res.send('CSRF token invalid');
        });
    }

    // Register routes
    require('./routes')(app);

    return app;
};

exports.server = function(options) {
    const app = exports(options);

    http.createServer(app).listen(config.port, function() {
        console.log('Server listening at %s:%s', 'localhost', config.port);
    });
};

module.exports.app = exports();