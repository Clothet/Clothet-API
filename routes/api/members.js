var Member = require('../../models').Member;
var MemberSession = require('../../models').MemberSession;
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var _ = require('lodash');
var passwordHash = require('../../lib/md5').passwordHash;
var moment = require('moment');
var async = require('async');
var request = require('request');
var requestAsync = Promise.promisify(request);

var redis = require('redis');
var local = require('../../config/local');
var client = redis.createClient(local.session.redis.port, local.session.redis.host);
client = Promise.promisifyAll(client);
if (local.session.redis.pass) {
    client.auth(local.session.redis.pass);
}

var dns = require('dns');
var Fuse = require('fuse.js');
var fs = require('fs');
var util_path = require('path');

/**
 * @api {post} /api/member/signup Signup
 * @apiName member.signup
 * @apiGroup member
 *
 * @apiParam {string} user member unique email.
 * @apiParam {string} password member password
 * @apiParam {string} username user name.
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
    var newMember = {
        user: req.body.user,
        password: req.body.password,
        username: req.body.username
    };

    if (!newMember.user || !newMember.password || !newMember.username) {
        return res.status(400).json({
            error: true,
            msg: 'invaild parameters'
        });
    }

    Member
        .create(newMember)
        .then(function(member) {
            res.json({
                success: true
            });
        })
        .catch(function(err) {
            res.status(500).json({
                error: err
            });
        });
};

var letMeLogin = function(user, req, res, response) {
    req.session.user = user;
    req.session.isLogin = true;

    return MemberSession.create({
        member_id: user.dataValues.id,
        session_id: req.session.id
    })
    .then(function(session) {
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
 * @api {post} /api/member/login Login
 * @apiName member.login
 * @apiGroup member
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
    if (!req.body.user || !req.body.password) {
        return res.status(400).json({
            isLogin: false,
            msg: '請輸入帳號密碼',
        });
    }

    var user = req.body.user;
    var password = req.body.password;

    var where = {
        where: Sequelize.or({
            user: user
        })
    };

    // first find username in member
    Member
        .find(where)
        .then(function(user) {
            var response = {};
            var halt_time = Math.round((Math.random() + 1) * 1000);
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
 * @api {get} /api/member/status member status
 * @apiName member.status
 * @apiGroup member
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
    var response = {
        isLogin: false,
        fb_login: {
            status: false
        }
    };

    if ((!_.has(req.session, 'isLogin')) || !req.session.isLogin) {
        return res.json(response);
    }

    response.isLogin = req.session.isLogin;

    var id = req.session.user.id;

    var tasks = {
        //notification: sequelize.query(notification_sql),
    };

    Promise
        .props(tasks)
        .then(function(results) {
            response.user = {
                name: req.session.user.name,
                username: req.session.user.username,
                image: req.session.user.image
            };

            res.json(response);
        });
};

/**
 * @api {post} /api/member/logout Logout
 * @apiName member.logout
 * @apiGroup member
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
