'use strict';

const Equipment = require('../../models').Equipment;
const Item_style = require('../../models').Item_style;
const Item = require('../../models').Item;


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
    "id": "1646801",
    "item_serial_no": 16468,
    "image": "/i/16468/16468011/1646801_500.jpg",
    "color": "灰卡其",
    "size": "7,7.5,8,8.5,9,9.5,10,10.5",
    "created_at": "2016-12-13T05:46:02.000Z",
    "updated_at": "2016-12-13T05:46:02.000Z",
    "item": {
      "serial_no": 16468,
      "name": "純棉經典帆布休閒鞋-男",
      "image": "http://s1.lativ.com.tw/i/16468/16468_L_51.jpg,http://s2.lativ.com.tw/i/16468/16468_L_52.jpg",
      "category": "家居服&配件",
      "sub_category": "鞋類",
      "price": "339",
      "brand": "lativ",
      "pattern": "帆布鞋",
      "target": "men",
      "created_at": "2016-12-13T05:45:11.000Z",
      "updated_at": "2016-12-13T05:45:12.000Z"
    }
  },
  {
    "id": "1646803",
    "item_serial_no": 16468,
    "image": "/i/16468/16468031/1646803_500.jpg",
    "color": "紅色",
    "size": "7.5",
    "created_at": "2016-12-13T05:46:02.000Z",
    "updated_at": "2016-12-13T05:46:02.000Z",
    "item": {
      "serial_no": 16468,
      "name": "純棉經典帆布休閒鞋-男",
      "image": "http://s1.lativ.com.tw/i/16468/16468_L_51.jpg,http://s2.lativ.com.tw/i/16468/16468_L_52.jpg",
      "category": "家居服&配件",
      "sub_category": "鞋類",
      "price": "339",
      "brand": "lativ",
      "pattern": "帆布鞋",
      "target": "men",
      "created_at": "2016-12-13T05:45:11.000Z",
      "updated_at": "2016-12-13T05:45:12.000Z"
    }
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
    const {offset, limit} = req.query;
    const member_id = req.session.user.id;

    Equipment
        .findAll({
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30,
            where: { member_id: member_id }
        })
        .map(item => {
            return Item_style
                .findOne({
                    where: {
                        id: item.item_style_id
                    },
                    include: [
                        {
                            model: Item,
                            as: 'item',
                        }
                    ]
                });
        })
        .then(items => {
            res.json(items);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};

/**
 * @api {post} /api/equipments/:item_style_id Add
 * @apiName equipments.add
 * @apiGroup equipments
 * @apiDescription 加入自己的裝備，需登入
 *
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 OK
 *
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 error
 */
exports.add = (req, res) => {
    let item_style_id = req.params.item_style_id;
    let member_id = req.session.user.id;

    Equipment
        .create({
            item_style_id,
            member_id
        })
        .then(() => res.status(201).send())
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};

/**
 * @api {delete} /api/equipments/:item_style_id Delete
 * @apiName equipments.delete
 * @apiGroup equipments
 * @apiDescription 移除自己的裝備，需登入
 *
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 201 OK
 *
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 error
 */
exports.remove = (req, res) => {
    let item_style_id = req.params.item_style_id;
    let member_id = req.session.user.id;

    Equipment
        .destroy({
            where : {
                item_style_id,
                member_id
            }
        })
        .then(() => res.status(201).send())
        .catch(() => res.status(500).send());
};