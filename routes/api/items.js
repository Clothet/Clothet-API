'use strict';

const Item = require('../../models').Item;
const Item_style = require('../../models').Item_style;

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
    HTTP/1.1 200 OK
    [
        {
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
            limit: limit ? parseInt(limit, 10) : 30,
            attributes: { exclude: ['id'] }
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
        });
};

/**
 * @api {get} /api/items/:id Show
 * @apiName items.show
 * @apiGroup items
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
{
    "serial_no": "16469",
    "name": "純棉經典帆布休閒鞋-女",
    "image": "http://s3.lativ.com.tw/i/16469/16469_L_51.jpg,http://s4.lativ.com.tw/i/16469/16469_L_52.jpg",
    "category": "家居服&配件",
    "sub_category": "鞋類",
    "price": "339",
    "brand": "lativ",
    "pattern": "帆布鞋",
    "target": "women",
    "created_at": "2016-12-11T19:04:17.000Z",
    "updated_at": "2016-12-11T19:04:18.000Z",
    "styles": [
        {
            "id": "16469022",
            "image": "/i/16469/16469021/1646902_500.jpg",
            "color": "水綠",
            "size": "6,6.5,7",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469053",
            "image": "/i/16469/16469051/1646905_500.jpg",
            "color": "紅色",
            "size": "6.5,7,7.5",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469062",
            "image": "/i/16469/16469061/1646906_500.jpg",
            "color": "酒紅",
            "size": "6,6.5,7",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469072",
            "image": "/i/16469/16469071/1646907_500.jpg",
            "color": "寶藍",
            "size": "6,6.5,7,7.5",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469080",
            "image": "/i/16469/16469081/1646908_500.jpg",
            "color": "灰紫",
            "size": "5,6,6.5,7",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469090",
            "image": "/i/16469/16469091/1646909_500.jpg",
            "color": "白色",
            "size": "5,5.5,6,6.5,7,7.5,8,8.5",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469100",
            "image": "/i/16469/16469101/1646910_500.jpg",
            "color": "黑色",
            "size": "5,5.5,6,6.5,7,7.5,8,8.5",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        },
        {
            "id": "16469131",
            "image": "/i/16469/16469131/1646913_500.jpg",
            "color": "藏青",
            "size": "5.5,6,6.5,7,7.5,8,8.5",
            "created_at": "2016-12-11T19:05:39.000Z",
            "updated_at": "2016-12-11T19:05:39.000Z"
        }
    ]
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
        });
};


/**
 * @api {get} /api/items/search Search
 * @apiName items.search
 * @apiGroup items
 *
 * @apiParam {string} category 分類
 * @apiParam {string} sub_category 次分類
 * @apiParam {string} name 關鍵字
 * @apiParam {string} target 客群 (men/woman/unisex)
 * @apiParam {number} offset
 * @apiParam {number} limit
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
    let {category, sub_category, name, target, limit, offset} = req.query;
    let query = { where:{} };

    if (!category && !sub_category && !name && !target) {
        return res.status(400).json({
            msg: 'invalid params'
        });
    }

    query.limit = limit ? parseInt(limit, 10) : 30;
    query.offset = offset ? parseInt(offset, 10) : 0;

    if (category) query.where.category = category;
    if (sub_category) query.where.sub_category = sub_category;
    if (target) query.where.target = target;
    if (name) query.where.name = { like: `%${name}%` };

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

/**
 * @api {get} /api/items/details/:style_id Show Detail
 * @apiName items.show_detail
 * @apiGroup items
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
HTTP/1.1 200 OK
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
}
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 error
 *     {
 *       "error": err_object
 *     }
 */
exports.show_details = (req, res) => {
    let style_id = req.params.style_id;

    Item_style
        .findOne({
            where: {
                id: style_id
            },
            include: [
                {
                    model: Item,
                    as: 'item',
                    // attributes: { exclude: ['item_serial_no'] }
                }
            ]
        })
        .then(item => res.json(item))
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};
