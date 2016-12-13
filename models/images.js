'use strict';



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
