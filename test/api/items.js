'use strict';

const app = require('../../server').app;
const supertest = require('supertest')(app);
const fixtureUtils = require('../utils/fixture_utils.js');
const items = require('../fixtures/items.json');

describe('Members', () => {
    before(done => {
        fixtureUtils
            .createFixtures('Item', items)
            .then(() => { done(); });
    });

    after(done => {
        fixtureUtils
            .deleteFixtures('Item')
            .then(() => { done(); });
    });

    it('Should show item list', done => {
        supertest
            .get('/api/items')
            .expect(200)
            .end(done);
    });
    
    it('Should show item details', done => {
        done();
    });

    it('Should show item list with search condictions', done => {
        done();
    });
});
