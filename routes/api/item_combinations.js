'use strict';

const Item_combination = require('../../models').Item_combination;
const Item_style = require('../../models').Item_style;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');

/**
 * @api {get} /api/item_combinations List
 * @apiName item_combinations.list
 * @apiGroup item_combinations
 *
 * @apiParam {number} offset
 * @apiParam {number} limit
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
 [
  {
    "combination_id": 0,
    "item_ids": "28123055,28373205,28465042,28925031"
  },
  {
    "combination_id": 1,
    "item_ids": "28022065,28116045,28587031"
  },
  {
    "combination_id": 2,
    "item_ids": "28454064,28519044,28553065,28565055"
  },
  {
    "combination_id": 3,
    "item_ids": "28137045,28352089,28466024"
  },
  {
    "combination_id": 4,
    "item_ids": "28122055,28374065,28925031"
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

    let result = [];
    Item_combination
        .findAll({
            attributes: [
                'combination_id',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("item_style_id")), 'item_ids']
            ],
            group: ['combination_id'],
            // include: [{
            //     model: Item_style,
            //     as: 'items',
            // }],
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30,
            order: ['combination_id']
        })
        .then(group => {
            res.json(group);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};


/**
 * @api {get} /api/item_combinations Show
 * @apiName item_combinations.show
 * @apiGroup item_combinations
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 HTTP/1.1 200 OK
[
  {
    "id": 34,
    "item_style_id": 26329031,
    "combination_id": 9,
    "category": "women",
    "image": "http://s1.lativ.com.tw/i/28118/28118_L_07_0.jpg",
    "created_at": "2016-12-12T08:38:28.000Z",
    "updated_at": "2016-12-12T08:38:28.000Z",
    "items": {
      "id": "26329031",
      "item_serial_no": 26329,
      "image": "/i/26329/26329031/2632903_500.jpg",
      "color": "藏青",
      "size": "S",
      "created_at": "2016-12-12T08:37:29.000Z",
      "updated_at": "2016-12-12T08:37:29.000Z"
    }
  },
  {
    "id": 37,
    "item_style_id": 28926021,
    "combination_id": 9,
    "category": "women",
    "image": "http://s1.lativ.com.tw/i/28118/28118_L_07_0.jpg",
    "created_at": "2016-12-12T08:38:28.000Z",
    "updated_at": "2016-12-12T08:38:28.000Z",
    "items": {
      "id": "28926021",
      "item_serial_no": 28926,
      "image": "/i/28926/28926021/2892602_500.jpg",
      "color": "鐵灰",
      "size": "F",
      "created_at": "2016-12-12T08:37:15.000Z",
      "updated_at": "2016-12-12T08:37:15.000Z"
    }
  },
  {
    "id": 35,
    "item_style_id": 28118055,
    "combination_id": 9,
    "category": "women",
    "image": "http://s1.lativ.com.tw/i/28118/28118_L_07_0.jpg",
    "created_at": "2016-12-12T08:38:28.000Z",
    "updated_at": "2016-12-12T08:38:28.000Z",
    "items": null
  },
  {
    "id": 36,
    "item_style_id": 28588033,
    "combination_id": 9,
    "category": "women",
    "image": "http://s1.lativ.com.tw/i/28118/28118_L_07_0.jpg",
    "created_at": "2016-12-12T08:38:28.000Z",
    "updated_at": "2016-12-12T08:38:28.000Z",
    "items": null
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
exports.show = (req, res) => {
    let id = req.params.id;

    Item_combination
        .findAll({
            where: {
                combination_id: id
            },
            include: [{
                model: Item_style,
                as: 'items',
            }],
        })
        .then(item => res.json(item))
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};