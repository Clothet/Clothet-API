'use strict';

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);


exports.Image = function(Sequelize, sequelize) {
    const Image = sequelize.define('Image', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        combination_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
        tableName: 'images',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Image;
};
