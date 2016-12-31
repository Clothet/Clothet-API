'use strict';

const Favorite = require('../../models').Favorite;
const Item_combination = require('../../models').Item_combination;
const Item_style = require('../../models').Item_style;
const Sequelize = require('sequelize');


/**
 * @api {get} /api/favorites List
 * @apiName favorites.list
 * @apiGroup favorites
 * @apiDescription 列出收藏組合，需登入
 *
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 [
    {
        "combination_id": 2,
        "item_ids": "2845406,2851904,2855306,2856505",
        "details": [
            {
                "id": "2845406",
                "item_serial_no": 28454,
                "image": "/i/28454/28454061/2845406_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL",
                "created_at": "2016-12-13T05:45:50.000Z",
                "updated_at": "2016-12-13T05:45:50.000Z"
            },
            {
                "id": "2851904",
                "item_serial_no": 28519,
                "image": "/i/28519/28519041/2851904_500.jpg",
                "color": "深藍",
                "size": "S,M,L,XL",
                "created_at": "2016-12-13T05:45:56.000Z",
                "updated_at": "2016-12-13T05:45:56.000Z"
            },
            {
                "id": "2855306",
                "item_serial_no": 28553,
                "image": "/i/28553/28553061/2855306_500.jpg",
                "color": "深藍細格",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-13T05:45:52.000Z",
                "updated_at": "2016-12-13T05:45:52.000Z"
            },
            {
                "id": "2856505",
                "item_serial_no": 28565,
                "image": "/i/28565/28565051/2856505_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-13T05:45:44.000Z",
                "updated_at": "2016-12-13T05:45:44.000Z"
            }
        ]
    },
    {
        "combination_id": 3,
        "item_ids": "2813704,2835208,2846602",
        "details": [
            {
                "id": "2813704",
                "item_serial_no": 28137,
                "image": "/i/28137/28137041/2813704_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-13T05:45:50.000Z",
                "updated_at": "2016-12-13T05:45:50.000Z"
            },
            {
                "id": "2835208",
                "item_serial_no": 28352,
                "image": "/i/28352/28352081/2835208_500.jpg",
                "color": "黑色",
                "size": "22,23,24,25,26,27,28,29,30",
                "created_at": "2016-12-13T05:45:55.000Z",
                "updated_at": "2016-12-13T05:45:55.000Z"
            },
            {
                "id": "2846602",
                "item_serial_no": 28466,
                "image": "/i/28466/28466021/2846602_500.jpg",
                "color": "深藍",
                "size": "S,M,L,XL",
                "created_at": "2016-12-13T05:45:45.000Z",
                "updated_at": "2016-12-13T05:45:45.000Z"
            }
        ]
    },
    {
        "combination_id": 4,
        "item_ids": "2812205,2837406,2892503",
        "details": [
            {
                "id": "2812205",
                "item_serial_no": 28122,
                "image": "/i/28122/28122051/2812205_500.jpg",
                "color": "黑色",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-13T05:45:50.000Z",
                "updated_at": "2016-12-13T05:45:50.000Z"
            },
            {
                "id": "2837406",
                "item_serial_no": 28374,
                "image": "/i/28374/28374061/2837406_500.jpg",
                "color": "藍綠彩格",
                "size": "S,M,L,XL,XXL",
                "created_at": "2016-12-13T05:45:49.000Z",
                "updated_at": "2016-12-13T05:45:49.000Z"
            },
            {
                "id": "2892503",
                "item_serial_no": 28925,
                "image": "/i/28925/28925031/2892503_500.jpg",
                "color": "藏青",
                "size": "F",
                "created_at": "2016-12-13T05:45:43.000Z",
                "updated_at": "2016-12-13T05:45:43.000Z"
            }
        ]
    }
 ]
 *
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 error
 */
exports.list = (req, res) => {
    let {offset, limit} = req.query;
    let member_id = req.session.user.id;


    Favorite
        .findAll({
            where: { member_id },
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30,
            attributes: ['combination_id']
        })
        .map(id => id.dataValues.combination_id)
        .then(ids => {
            console.log(ids);
            listCombinations(ids).then(results => res.json(results));
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send();
        });
};

/**
 * @api {post} /api/favorites/:combination_id Add
 * @apiName favorites.add
 * @apiGroup favorites
 * @apiDescription 收藏組合，需登入
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
    let combination_id = req.params.combination_id;
    let member_id = req.session.user.id;

    Favorite
        .findOrCreate({
            where: {
                combination_id,
                member_id
            }
        })
        .then(() => res.status(201).send())
        .catch(err => {
            console.error(err);
            res.status(500).send();
        });
};

/**
 * @api {delete} /api/favorites/:combination_id Remove
 * @apiName favorites.remove
 * @apiGroup favorites
 * @apiDescription 取消收藏組合，需登入
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
    let combination_id = req.params.combination_id;
    let member_id = req.session.user.id;

    Favorite
        .destroy({
            where : {
                combination_id,
                member_id
            }
        })
        .then(() => res.status(201).send())
        .catch(() => res.status(500).send());
};


function listCombinations(ids) {
    return Item_combination
        .findAll({
            where: {
                combination_id: { $in: ids}
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
        .then(result => result);
}