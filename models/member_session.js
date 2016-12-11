exports.MemberSession = function(Sequelize, sequelize) {
    return sequelize.define('MemberSession', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        member_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        session_id: {
            type: Sequelize.STRING,
            allowNull: false
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
        tableName: 'member_session',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [{
            fields: ['member_id'],
            method: 'BTREE'
        }]
    });
};
