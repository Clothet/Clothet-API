'use strict';

exports.Combination = function(Sequelize, sequelize) {
    const Combination = sequelize.define('Combination', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_combination_id: {
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
        tableName: 'combinations',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Combination;
};
