var express = require('express');
var multer = require('multer');
var upload = multer();
var app = express();

var middlewares = require('../middleware/middlewares.js');
var members = require('./members');
var items = require('./items');

// API logger
//app.use(middlewares.pageLog);

// items
app.get('/items', items.list);

// members
app.post('/members/signup', members.signup);
app.post('/members/login', members.login);
app.get('/members/status', middlewares.checkLogin, members.status);
app.post('/members/logout', middlewares.checkLogin, members.logout);


module.exports = app;
