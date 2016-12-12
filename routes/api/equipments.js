'use strict';

const Equipment = require('../../models').Equipment;
const Item = require('../../models').Item;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');


/**
 * @api {get} /api/equipments List
 * @apiName equipments.list
 * @apiGroup equipments
 * @apiDescription 列出自己的裝備，需要登入
 *
 * @apiParam {number} offset
 * @apiParam {number} limit
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
[
    {
        "serial_no": 16468,
        "name": "純棉經典帆布休閒鞋-男",
        "image": "http://s1.lativ.com.tw/i/16468/16468_L_51.jpg,http://s2.lativ.com.tw/i/16468/16468_L_52.jpg",
        "category": "家居服&配件",
        "sub_category": "鞋類",
        "price": "339",
        "brand": "lativ",
        "pattern": "帆布鞋",
        "target": "men",
        "created_at": "2016-12-12T14:36:38.000Z",
        "updated_at": "2016-12-12T14:36:39.000Z"
    },
    {
        "serial_no": 16469,
        "name": "純棉經典帆布休閒鞋-女",
        "image": "http://s3.lativ.com.tw/i/16469/16469_L_51.jpg,http://s4.lativ.com.tw/i/16469/16469_L_52.jpg",
        "category": "家居服&配件",
        "sub_category": "鞋類",
        "price": "339",
        "brand": "lativ",
        "pattern": "帆布鞋",
        "target": "women",
        "created_at": "2016-12-12T14:36:38.000Z",
        "updated_at": "2016-12-12T14:36:39.000Z"
    }
]

 *
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 error
 *     {
 *       "error": err_object
 *     }
 */

exports.list = (req, res) => {
    let {offset, limit} = req.query;

    Equipment
        .findAll({
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30,
        })
        .map(item => Item.findById(item.item_id))
        .then(items => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};
