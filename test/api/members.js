'use strict';

const app = require('../../server').app;
const supertest = require('supertest')(app);
const members = require('../fixtures/members.json');

describe('Members', () => {
    it('Should create membership', done => {
        supertest
            .post('/api/members/signup')
            .send(members[0])
            .expect(200)
            .end(done);
    });

    it('Should login', done => {
        supertest
            .post('/api/members/login')
            .send(members[0])
            .expect(200)
            .expect(res => {
                console.log(res.body);
            })
            .end(done);
    });
});
