'use strict';

var Item = require('../../models').Item;
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var _ = require('lodash');

exports.list = (req, res) => {
    Item
        .findAll()
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        })
};
