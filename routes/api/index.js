'use strict';

const express = require('express');
const multer = require('multer');
const upload = multer();
const app = express();

const middlewares = require('../middleware/middlewares.js');
const members = require('./members');
const items = require('./items');
const item_combinations = require('./item_combinations');

// API logger
//app.use(middlewares.pageLog);

// items
app.get('/items', items.list);
app.get('/items/search', items.search);
app.get('/items/:id', items.show);

// item_combination
app.get('/item_combinations', item_combinations.list);
// app.get('/items/search', items.search);
app.get('/item_combinations/:id', item_combinations.show);


// members
app.post('/members/signup', members.signup);
app.post('/members/login', members.login);
app.get('/members/status', middlewares.checkLogin, members.status);
app.post('/members/logout', middlewares.checkLogin, members.logout);


module.exports = app;
