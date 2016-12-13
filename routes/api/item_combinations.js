'use strict';

const Item_combination = require('../../models').Item_combination;
const Item_style = require('../../models').Item_style;
const Sequelize = require('sequelize');
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
        "item_ids": "2846504,2837320,2892503,2812305",
        "details": [
            {
                "id": "2812305",
                "item_serial_no": 28123,
                "image": "/i/28123/28123051/2812305_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2837320",
                "item_serial_no": 28373,
                "image": "/i/28373/28373201/2837320_500.jpg",
                "color": "藍綠格",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2846504",
                "item_serial_no": 28465,
                "image": "/i/28465/28465041/2846504_500.jpg",
                "color": "黑色",
                "size": "M,L",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2892503",
                "item_serial_no": 28925,
                "image": "/i/28925/28925031/2892503_500.jpg",
                "color": "藏青",
                "size": "F",
                "created_at": "2016-12-12T14:37:16.000Z",
                "updated_at": "2016-12-12T14:37:16.000Z"
            }
        ]
    },
    {
        "combination_id": 1,
        "item_ids": "2802206,2811604,2858703",
        "details": [
            {
                "id": "2802206",
                "item_serial_no": 28022,
                "image": "/i/28022/28022061/2802206_500.jpg",
                "color": "黑色雪花",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:17.000Z",
                "updated_at": "2016-12-12T14:37:17.000Z"
            },
            {
                "id": "2811604",
                "item_serial_no": 28116,
                "image": "/i/28116/28116041/2811604_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2858703",
                "item_serial_no": 28587,
                "image": "/i/28587/28587031/2858703_500.jpg",
                "color": "黑色",
                "size": "S",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            }
        ]
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

    Item_combination
        .findAll({
            attributes: [
                'combination_id',
                [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("item_style_id")), 'item_ids'],

            ],
            group: ['combination_id'],
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 10,
            order: ['combination_id']
          })
        .map(com => {
            return Item_style
                .findAll({
                    where: {
                        id: { $in: com.dataValues.item_ids.split(',') }
                      }
                  })
                .then(details => {
                    com.dataValues.details = details.map(d => d.dataValues);
                    return com;
                  });
          })
        .then(result => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).send();
          });
  };


/**
 * @api {get} /api/item_combinations/:combination_id Show
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
          })
        .then(items => {
            result = items[0].dataValues;
            return items;
          })
        .map(item => {
            return Item_style.findById(item.item_style_id);
          })
        .then(items => {
            result.details = items.map((i => i.dataValues));
            delete result.id;
            delete result.item_style_id;
            res.json(result);
          })
        .catch(err => {
            console.error(err);
            res.status(500).send();
          });
  };

/**
 * @api {get} /api/item_combinations/search Search
 * @apiName item_combinations.search
 * @apiGroup item_combinations
 *
 * @apiParam {number} item_id A item's id
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
[
    {
        "combination_id": 0,
        "item_ids": "2846504,2837320,2892503,2812305",
        "details": [
            {
                "id": "2812305",
                "item_serial_no": 28123,
                "image": "/i/28123/28123051/2812305_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2837320",
                "item_serial_no": 28373,
                "image": "/i/28373/28373201/2837320_500.jpg",
                "color": "藍綠格",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2846504",
                "item_serial_no": 28465,
                "image": "/i/28465/28465041/2846504_500.jpg",
                "color": "黑色",
                "size": "M,L",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2892503",
                "item_serial_no": 28925,
                "image": "/i/28925/28925031/2892503_500.jpg",
                "color": "藏青",
                "size": "F",
                "created_at": "2016-12-12T14:37:16.000Z",
                "updated_at": "2016-12-12T14:37:16.000Z"
            }
        ]
    },
    {
        "combination_id": 1,
        "item_ids": "2802206,2811604,2858703",
        "details": [
            {
                "id": "2802206",
                "item_serial_no": 28022,
                "image": "/i/28022/28022061/2802206_500.jpg",
                "color": "黑色雪花",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:17.000Z",
                "updated_at": "2016-12-12T14:37:17.000Z"
            },
            {
                "id": "2811604",
                "item_serial_no": 28116,
                "image": "/i/28116/28116041/2811604_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            },
            {
                "id": "2858703",
                "item_serial_no": 28587,
                "image": "/i/28587/28587031/2858703_500.jpg",
                "color": "黑色",
                "size": "S",
                "created_at": "2016-12-12T14:37:18.000Z",
                "updated_at": "2016-12-12T14:37:18.000Z"
            }
        ]
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
exports.search = (req, res) => {
    const {item_id} = req.query;

    Item_combination
        .findAll({
            where: {
                item_style_id: item_id
              },
            attributes: ['combination_id']
          })
        .then(com => {
            const ids = _.values(_.mapValues(com, (i)=>i.combination_id));
            return batchFindCombinations(ids);
          })
        .then(coms => res.json(coms));
  };


function batchFindCombinations(ids) {
  return Item_combination
      .findAll({
          where: {
              combination_id: { $in: ids }
            },
          attributes: [
              'combination_id',
              [Sequelize.fn('GROUP_CONCAT', Sequelize.literal("item_style_id")), 'item_ids'],
          ],
          group: ['combination_id'],
          order: ['combination_id']
        })
      .map(com => {
          return Item_style
              .findAll({
                  where: {
                      id: { $in: com.dataValues.item_ids.split(',') }
                    }
                })
              .then(details => {
                  com.dataValues.details = details.map(d => d.dataValues);
                  return com;
                });
        })
      .then(result => result)
      .catch((err) => {
          return console.error(err);
        });
}