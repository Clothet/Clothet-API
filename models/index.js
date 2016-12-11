var Promise = require("bluebird");
var local = require("../config/local");
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    local.model.mysql.database,
    local.model.mysql.account,
    local.model.mysql.password,
    local.model.mysql.options
);

var Member = require("./members").Member(Sequelize, sequelize);
var MemberSession = require("./member_session").MemberSession(Sequelize, sequelize);
var Item = require("./items").Item(Sequelize, sequelize);
var Favorite = require("./favorites").Favorite(Sequelize, sequelize);
var Equipment = require("./equipments").Equipment(Sequelize, sequelize);
var Combination = require("./combinations").Combination(Sequelize, sequelize);
var Item_combination = require("./item_combination").Item_combination(Sequelize, sequelize);
var Image = require("./images").Image(Sequelize, sequelize);
var Item_style = require("./item_styles").Item_style(Sequelize, sequelize);

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
