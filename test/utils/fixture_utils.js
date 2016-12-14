'use strict';

const models = require('../../models');

exports.createFixtures = (table, data) => {
    return models[table].bulkCreate(data);
};

exports.deleteFixtures = (table) => {
    return models[table].destroy({ where: {}});
};
