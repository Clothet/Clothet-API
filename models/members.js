'use strict';

var passwordHash = require('../lib/md5').passwordHash;

exports.Member = function(Sequelize, sequelize) {
    let Member = sequelize.define('Member', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    args: true,
                    msg: "信箱格式錯誤"
                }
            }
        },
        password: {
            type: Sequelize.STRING
        },
        name: Sequelize.STRING,
        image: Sequelize.STRING,
        facebookId: {
            type: Sequelize.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'members'
    });

    // encoded password with md5
    Member.beforeCreate(function(instance, options) {
        instance.password = passwordHash(instance.password);
        return instance;
    });

    return Member;
};
