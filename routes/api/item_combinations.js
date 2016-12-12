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
{
  "item_style_id": 2632903,
  "combination_id": 9,
  "category": "women",
  "image": "http://s1.lativ.com.tw/i/28118/28118_L_07_0.jpg",
  "created_at": "2016-12-12T14:40:03.000Z",
  "updated_at": "2016-12-12T14:40:03.000Z",
  "details": [
    {
      "id": "2632903",
      "item_serial_no": 26329,
      "image": "/i/26329/26329031/2632903_500.jpg",
      "color": "藏青",
      "size": "S",
      "created_at": "2016-12-12T14:37:18.000Z",
      "updated_at": "2016-12-12T14:37:18.000Z"
    },
    {
      "id": "2811805",
      "item_serial_no": 28118,
      "image": "/i/28118/28118051/2811805_500.jpg",
      "color": "黑色",
      "size": "M,L,XL,XXL",
      "created_at": "2016-12-12T14:37:17.000Z",
      "updated_at": "2016-12-12T14:37:17.000Z"
    },
    {
      "id": "2858803",
      "item_serial_no": 28588,
      "image": "/i/28588/28588031/2858803_500.jpg",
      "color": "黑色",
      "size": "S,M,L",
      "created_at": "2016-12-12T14:37:18.000Z",
      "updated_at": "2016-12-12T14:37:18.000Z"
    },
    {
      "id": "2892602",
      "item_serial_no": 28926,
      "image": "/i/28926/28926021/2892602_500.jpg",
      "color": "鐵灰",
      "size": "F",
      "created_at": "2016-12-12T14:37:17.000Z",
      "updated_at": "2016-12-12T14:37:17.000Z"
    }
  ]
}
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

    let result;
    Item_combination
        .findAll({
            where: {
                combination_id: id
            },
            // attributes: ['item_style_id']
        })
        .then(items => {
            result = items[0].dataValues;
            delete result.id;
            return items;
        })
        .map(item => {
            return Item_style.findById(item.item_style_id);
        })
        .then(items => {
            result.details = items.map((i => i.dataValues));
            res.json(result);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};