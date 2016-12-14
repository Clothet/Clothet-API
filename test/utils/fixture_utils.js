'use strict';

const models = require('../../models');

exports.createFixtures = (table, data) => {
    return models[table].bulkCreate(data);
};
