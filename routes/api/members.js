'use strict';

const Member = require('../../models').Member;
const MemberSession = require('../../models').MemberSession;
const Sequelize = require('sequelize');
const Promise = require('bluebird');
const _ = require('lodash');
const passwordHash = require('../../lib/md5').passwordHash;

const redis = require('redis');
const local = require('../../config/local');
let client = redis.createClient(local.session.redis.port, local.session.redis.host);
client = Promise.promisifyAll(client);
if (local.session.redis.pass) {
    client.auth(local.session.redis.pass);
}


/**
 * @api {post} /api/members/signup Signup
 * @apiName members.signup
 * @apiGroup members
 *
 * @apiParam {string} username member unique email.
 * @apiParam {string} password member password
 * @apiParam {string} name user name.
 *
 * @apiSuccess {bool} success success
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true
 *     }
 *
 * @apiError ServerError server internal error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 error
 *     {
 *       "error": err_object
 *     }
 */
exports.signup = function(req, res) {
    const newMember = {
        username: req.body.username,
        password: req.body.password,
        name: req.body.name
    };

    if (!newMember.username || !newMember.password || !newMember.name) {
        return res.status(400).json({
            error: true,
            msg: 'invaild parameters'
        });
    }

    Member
        .create(newMember)
        .then(function() {
            res.json({
                success: true
            });
        })
        .catch(function() {
            res.status(400).json({
                msg: 'already have account.'
            });
        });
};

const letMeLogin = function(user, req, res, response) {
    req.session.user = user;
    req.session.isLogin = true;

    return MemberSession.create({
        member_id: user.dataValues.id,
        session_id: req.session.id
    })
    .then(function() {
        // omit password field
        response.user = _.omit(user.dataValues, 'password');
        response.isLogin = true;
        response.isValidate = true;
        return res.json(response);
    })
    .catch(function(err) {
        console.error('login error:', err);
    });
};

/**
 * @api {post} /api/members/login Login
 * @apiName members.login
 * @apiGroup members
 *
 * @apiParam {string} user member's account(email).
 * @apiParam {string} password member's password
 *
 * @apiSuccess {object} memberObject details of member data
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user": {
 *         "id": 9,
 *         "user": "aswe@gmail.com",
 *         "username": "req.body.username",
 *         "photo": null,
 *         "facebookId": null,
 *       },
 *       "isLogin": true,
 *       "isValidate": true
 *     }
 *
 * @apiError UserNotFound Account/password not match
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 error
 *     {
 *       "isLogin": false,
 *       "msg": "帳號與密碼組合錯誤"
 *     }
 */
exports.login = function(req, res) {
    // check user and password are valid
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            isLogin: false,
            msg: '請輸入帳號密碼',
        });
    }

    let user = req.body.username;
    let password = req.body.password;

    let where = {
        where: Sequelize.or({
            username: user
        })
    };

    // first find username in member
    Member
        .find(where)
        .then(function(user) {
            let response = {};
            let halt_time = Math.round((Math.random() + 1) * 1000);
            setTimeout(function() {
                if (!user) {
                    req.session.isLogin = false;
                    response.isLogin = false;
                    return res.status(400).json(response);
                } else {
                  // username is correct, but password is not correct
                    if (user.password !== passwordHash(password)) {
                        req.session.isLogin = false;
                        response.isLogin = false;
                        response.msg = '帳號與密碼組合錯誤';
                        return res.status(400).json(response);
                    }
                    letMeLogin(user, req, res, response);
                }
            }, halt_time);
        }).error(function(err) {
            console.error('login Member.find error: ', err);
            res.status(500).json({
                msg: 'server error',
                isLogin: false
            });
        });
};

/**
 * @api {get} /api/members/status member status
 * @apiName members.status
 * @apiGroup members
 * @apiPermission Login
 *
 * @apiSuccess {object} memberObject details of "current session" member data
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isLogin": true,
 *       "fb_login": {
 *         "status": false
 *       },
 *       "user": {
 *         "username": "req.body.username",
 *         "user": "aswe@gmail.com",
 *         "image": null
 *       }
 *     }
 *
 * @apiError NoSession not login.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 error
 *     {
 *       "error": true,
 *       "msg": "請登入"
 *     }
 */
exports.status = function(req, res) {
    let response = {
        isLogin: false,
        fb_login: {
            status: false
        }
    };

    if ((!_.has(req.session, 'isLogin')) || !req.session.isLogin) {
        return res.json(response);
    }

    response.isLogin = req.session.isLogin;

    let tasks = {
      //notification: sequelize.query(notification_sql),
    };

    Promise
        .props(tasks)
        .then(function() {
            response.user = {
                name: req.session.user.name,
                username: req.session.user.username,
                image: req.session.user.image
            };

            res.json(response);
        });
};

/**
 * @api {post} /api/members/logout Logout
 * @apiName members.logout
 * @apiGroup members
 * @apiPermission Login
 *
 * @apiSuccess {object} isLogin =false
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "isLogin": false,
 *     }
 *
 * @apiError NoSession not login.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 error
 *     {
 *       "error": true,
 *       "msg": "請登入"
 *     }
 */
exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.json({
            isLogin: false
        });
    });
};
