'use strict';

var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);

exports.Item_style = function(Sequelize, sequelize) {
    const Item_style = sequelize.define('Item_style', {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
          },
        item_serial_no: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
        image: {
            type: Sequelize.TEXT,
            allowNull: true
          },
        color: {
            type: Sequelize.STRING,
            allowNull: false
          },
        size: {
            type: Sequelize.STRING,
            defaultValue: 'M',
            allowNull: true
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
        tableName: 'item_styles',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            fields: ['item_serial_no'],
            method: 'BTREE'
          }]
      });

    return Item_style;
  };
