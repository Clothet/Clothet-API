'use strict';

const Item = require('../../models').Item;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');

exports.list = (req, res) => {
    let {offset, limit} = req.query;

    Item
        .findAll({
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30
        })
        .then((items) => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        })
};

exports.show = (req, res) => {
    let id = req.params.id;

    Item
        .findById(id)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};

exports.search = (req, res) => {
    let {category, sub_category} = req.query;
    let query = { where:{} };

    if (!category && !sub_category) {
        return res.status(400).json({
            msg: 'invalid params'
        });
    }

    if (category) query.where.category = category;
    if (sub_category) query.where.sub_category = sub_category;

    Item
        .findAll(query)
        .then((item) => {
            res.json(item);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};
