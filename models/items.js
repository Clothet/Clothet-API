'use strict';


exports.Item = function(Sequelize, sequelize) {
    const Item = sequelize.define('Item', {
        serial_no: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true
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
