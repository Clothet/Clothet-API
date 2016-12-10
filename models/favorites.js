'use strict';
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);

//var Dish = require("./dish").Dish(Sequelize, sequelize);

exports.Favorite = function(Sequelize, sequelize) {
    const Favorite = sequelize.define('favorite', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        member_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        combination_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'favorites',
        indexes: [{
            fields: ['member_id'],
            method: 'BTREE'
        //}, {
            //fields: ['dish_id'],
            //method: 'BTREE'
        }]
    });

    return Favorite;
};
