'use strict';

exports.Item_combination = function(Sequelize, sequelize) {
    const Item_combination = sequelize.define('Item_combination', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
        item_style_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        combination_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        category: {
            type: Sequelize.STRING,
            allowNull: true,      
          },
        image: {
            type: Sequelize.STRING,
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
        tableName: 'item_combinations',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      });

    return Item_combination;
  };
