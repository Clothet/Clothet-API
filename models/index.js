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

//Restaurant.hasMany(Dish, {
    //foreignKey: 'restaurant_id',
    //as: 'dishes'
//});
//Dish.belongsTo(Restaurant, {
    //foreignKey: 'restaurant_id',
    //as: 'restaurant'
//});
Member.hasMany(Favorite, {
    foreignKey: 'member_id',
    as: 'favorites'
});
Favorite.belongsTo(Member, {
    foreignKey: 'member_id',
    as: 'member'
});

exports.sequelize = sequelize;
exports.Member = Member;
exports.MemberSession = MemberSession;
//exports.Restaurant = Restaurant;
exports.Item = Item;
exports.Favorite = Favorite;

exports.sqlPromise = function(query) {
    return new Promise(function(resolve, reject) {
        query.success(function(result) {
            resolve(result);
        }).error(function(e) {
            reject(e);
        });
    });
};
