'use strict';

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);


exports.Item_combination = function(Sequelize, sequelize) {
    const Item_combination = sequelize.define('Item_combination', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Combination_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: sequelize.literal('NOW()')
        }
    }, {
        tableName: 'item_combinations',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Item_combination;
};
