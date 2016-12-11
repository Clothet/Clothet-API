'use strict';

const Item = require('../../models').Item;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');

/**
 * @api {get} /api/items List
 * @apiName items.list
 * @apiGroup items
 *
 * @apiParam {number} offset
 * @apiParam {number} limit
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    [
        {
            "id": 6,
            "name": "條紋窄裙內搭褲-女",
            "image": [
            "http://s3.lativ.com.tw/i/18653/18653_L_61_1.jpg",
            "http://s4.lativ.com.tw/i/18653/18653_L_62_0.jpg"
            ],
            "category": "內衣&內褲&襪子",
            "sub_category": "褲襪・內搭褲",
            "price": "168",
            "brand": "lativ",
            "pattern": "假兩件",
            "target": "women",
            "size": null,
            "serial_no": "18653",
            "created_at": "2016-12-11T12:47:42.000Z",
            "updated_at": "2016-12-11T12:47:43.000Z"
        },
        {
            "id": 7,
            "name": "棉彈百搭褲-女",
            "image": [
            "http://s1.lativ.com.tw/i/18868/18868_L_61.jpg",
            "http://s2.lativ.com.tw/i/18868/18868_L_62.jpg"
            ],
            "category": "褲裝&裙裝",
            "sub_category": "長褲",
            "price": "225",
            "brand": "lativ",
            "pattern": "緊身褲・窄管褲",
            "target": "women",
            "size": null,
            "serial_no": "18868",
            "created_at": "2016-12-11T12:47:42.000Z",
            "updated_at": "2016-12-11T12:47:43.000Z"
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

    Item
        .findAll({
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30
        })
        .map(item => {
            item.image = item.image ? item.image.split(',') : [];
            return item;
        })
        .then(items => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        })
};

/**
 * @api {get} /api/items/:id Show
 * @apiName items.show
 * @apiGroup items
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
        {
            "id": 7,
            "name": "棉彈百搭褲-女",
            "image": [
            "http://s1.lativ.com.tw/i/18868/18868_L_61.jpg",
            "http://s2.lativ.com.tw/i/18868/18868_L_62.jpg"
            ],
            "category": "褲裝&裙裝",
            "sub_category": "長褲",
            "price": "225",
            "brand": "lativ",
            "pattern": "緊身褲・窄管褲",
            "target": "women",
            "size": null,
            "serial_no": "18868",
            "created_at": "2016-12-11T12:47:42.000Z",
            "updated_at": "2016-12-11T12:47:43.000Z"
        }
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 error
 *     {
 *       "error": err_object
 *     }
 */
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


/**
 * @api {get} /api/items/search Search
 * @apiName items.search
 * @apiGroup items
 *
 * @apiParam {number} category 分類
 * @apiParam {number} sub_category 次分類
 * 
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
[
  {
    "id": 12,
    "name": "連帽風衣外套-男",
    "image": "http://s3.lativ.com.tw/i/23047/23047_L_51.jpg,http://s4.lativ.com.tw/i/23047/23047_L_52.jpg",
    "category": "外套類",
    "sub_category": "外套・風衣・大衣",
    "price": "225",
    "brand": "lativ",
    "pattern": "風衣．大衣",
    "target": "men",
    "size": null,
    "serial_no": "23047",
    "created_at": "2016-12-11T12:47:42.000Z",
    "updated_at": "2016-12-11T12:47:43.000Z"
  },
  {
    "id": 13,
    "name": "連帽風衣外套-女",
    "image": "http://s1.lativ.com.tw/i/23050/23050_L_60.jpg,http://s2.lativ.com.tw/i/23050/23050_L_61_0.jpg",
    "category": "外套類",
    "sub_category": "外套・風衣・大衣",
    "price": "225",
    "brand": "lativ",
    "pattern": "風衣．大衣",
    "target": "women",
    "size": null,
    "serial_no": "23050",
    "created_at": "2016-12-11T12:47:42.000Z",
    "updated_at": "2016-12-11T12:47:43.000Z"
  },
  {
    "id": 65,
    "name": "吸排抗UV連帽外套-女",
    "image": "http://s3.lativ.com.tw/i/25234/25234_L_61.jpg,http://s4.lativ.com.tw/i/25234/25234_L_62.gif",
    "category": "外套類",
    "sub_category": "外套・風衣・大衣",
    "price": "490",
    "brand": "lativ",
    "pattern": "休閒外套",
    "target": "women",
    "size": null,
    "serial_no": "25234",
    "created_at": "2016-12-11T12:47:42.000Z",
    "updated_at": "2016-12-11T12:47:43.000Z"
  }
]

 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 error
 *     {
 *       "error": err_object
 *     }
 */
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
