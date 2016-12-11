'use strict';
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);

exports.Item = function(Sequelize, sequelize) {
    const Item = sequelize.define('Item', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        sub_category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.STRING,
            allowNull: true
        },
        brand: {
            type: Sequelize.STRING,
            allowNull: true
        },
        pattern: {
            type: Sequelize.STRING,
            allowNull: true
        },
        target: {
            type: Sequelize.STRING,
            allowNull: true
        },
        size: {
            type: Sequelize.STRING,
            allowNull: true
        },
        serial_no: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
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
        tableName: 'items',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            fields: ['serial_no'],
            method: 'BTREE'
        }]
    });

    return Item;
};
