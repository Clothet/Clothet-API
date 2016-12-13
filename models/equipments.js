'use strict';

exports.Equipment = function(Sequelize, sequelize) {
    const Equipment = sequelize.define('Equipment', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        item_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        member_id: {
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
        tableName: 'equipments',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });

    return Equipment;
};
