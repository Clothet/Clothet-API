'use strict';

const express = require('express');
const app = express();

const middlewares = require('../middleware/middlewares.js');
const members = require('./members');
const items = require('./items');
const item_combinations = require('./item_combinations');
const equipments = require('./equipments');
const favorites = require('./favorites');

// API logger
//app.use(middlewares.pageLog);

// items
app.get('/items', items.list);
app.get('/items/search', items.search);
app.get('/items/:id', items.show);

// item_combination
app.get('/item_combinations', item_combinations.list);
app.get('/item_combinations/search', item_combinations.search);
app.get('/item_combinations/:id', item_combinations.show);


// members
app.post('/members/signup', members.signup);
app.post('/members/login', members.login);
app.get('/members/status', middlewares.checkLogin, members.status);
app.post('/members/logout', middlewares.checkLogin, members.logout);

// equipments
app.get('/equipments', middlewares.checkLogin, equipments.list);
app.post('/equipments/:item_id', middlewares.checkLogin, equipments.add);
app.delete('/equipments/:item_id', middlewares.checkLogin, equipments.remove);

// favorites
app.get('/favorites', middlewares.checkLogin, favorites.list);
app.post('/favorites/:combination_id', middlewares.checkLogin, favorites.add);
app.delete('/favorites/:combination_id', middlewares.checkLogin, favorites.remove);

module.exports = app;
