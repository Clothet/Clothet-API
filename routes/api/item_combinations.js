'use strict';

const Item_combination = require('../../models').Item_combination;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');


exports.list = (req, res) => {
    let {offset, limit} = req.query;

    Item_combination
        .findAll({
            attributes: [
                'combination_id',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("item_style_id")), 'item_ids']
            ],
            group: ['combination_id'],
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30
        })
        .then(items => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};

exports.show = (req, res) => {
    let id = req.params.id;

    Item_combination
        .findOne({
            where: {
                serial_no: id
            },
            include: [
                {
                    model: Item_style,
                    as: 'styles',
                    attributes: { exclude: ['item_serial_no'] }
                }
            ]
        })
        .then(item => res.json(item))
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });};