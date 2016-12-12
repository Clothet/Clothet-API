'use strict'

const Promise = require("bluebird");
const local = require("../config/local");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);

const Member = require("./members").Member(Sequelize, sequelize);
const MemberSession = require("./member_session").MemberSession(Sequelize, sequelize);
const Item = require("./items").Item(Sequelize, sequelize);
const Favorite = require("./favorites").Favorite(Sequelize, sequelize);
const Equipment = require("./equipments").Equipment(Sequelize, sequelize);
const Combination = require("./combinations").Combination(Sequelize, sequelize);
const Item_combination = require("./item_combination").Item_combination(Sequelize, sequelize);
const Image = require("./images").Image(Sequelize, sequelize);
const Item_style = require("./item_styles").Item_style(Sequelize, sequelize);

Member.hasMany(Favorite, {
    foreignKey: 'member_id',
    as: 'favorites'
});
Favorite.belongsTo(Member, {
    foreignKey: 'member_id',
    as: 'member'
});

Item.hasMany(Item_style, {
    foreignKey: 'item_serial_no',
    as: 'styles'
});
Item_style.belongsTo(Item, {
    foreignKey: 'item_serial_no',
    as: 'item'
});

// Item_style.hasMany(Item_combination, {
//     foreignKey: 'item_style_id',
//     as: 'combinations'
// });
// Item_combination.belongsTo(Item_style, {
//     foreignKey: 'item_style_id',
//     as:'items'
// });

exports.sequelize = sequelize;
exports.Member = Member;
exports.MemberSession = MemberSession;
exports.Item = Item;
exports.Favorite = Favorite;
exports.Combination = Combination;
exports.Item_combination = Item_combination;
exports.Image = Image;
exports.Equipment = Equipment;
exports.Item_style = Item_style;

exports.sqlPromise = function(query) {
    return new Promise(function(resolve, reject) {
        query.success(function(result) {
            resolve(result);
        }).error(function(e) {
            reject(e);
        });
    });
};
