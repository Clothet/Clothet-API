'use strict';

const app = require('../../server').app;
const supertest = require('supertest')(app);
const fixtureUtils = require('../utils/fixture_utils.js');
const members = require('../fixtures/members.json');
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
            .then(() => { 
                return fixtureUtils.deleteFixtures('Member');
            })
            .then(() => { done(); });
    });

    it('Should not create member with non-email', done => {
        supertest
            .post('/api/members/signup')
            .send(members[2])
            .expect(400)
            .end(done);
    });

    it('Should create membership', done => {
        supertest
            .post('/api/members/signup')
            .send(members[0])
            .expect(200)
            .end(done);
    });

    it('Should not login with wrong password', done => {
        supertest
            .post('/api/members/login')
            .send({
                username: members[0].username,
                password: 'wrong'
            })
            .expect(400)
            .end(done);
    });

    it('Should login', done => {
        supertest
            .post('/api/members/login')
            .send(members[0])
            .expect(200)
            .end(done);
    });

    it('Should show member status', done => {
        done();
    });

    it('Should add favorite', done => {
        done();
    });

    it ('Should rmove favorite', done => {
        done();
    });

    it('Should add equipment', done => {
        done();
    });

    it('Should remove equipment', done => {
        done();
    });

});
