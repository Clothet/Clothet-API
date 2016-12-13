'use strict';

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
        tableName: 'favorites',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
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
