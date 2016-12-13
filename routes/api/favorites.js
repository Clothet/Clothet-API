'use strict';

const Favorite = require('../../models').Favorite;


exports.list = (req, res) => {
    let {offset, limit} = req.query;

    Favorite
        .findAll({
            offset: offset ? parseInt(offset, 10) : 0,
            limit: limit ? parseInt(limit, 10) : 30,
          })
        // .map(item => Item.findById(item.item_id))
        .then(items => {
            res.json(items);
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
        .catch(err => res.status(500).send());
  };