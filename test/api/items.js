'use strict';

const app = require("../../server").app;
const supertest = require("supertest")(app);

describe('Members', () => {
    it('Should create membership', done => {
        supertest
            .post('/api/members/signup')
            .send({
                username: 'test@gmail.com',
                password: '123456789',
                name: 'Robin'
            })
            .expect(200)
            .end(done);
    });

    it('Should login', done => {
        supertest
            .post('/api/members/login')
            .send({
                username: 'test@gmail.com',
                password: '123456789',
            })
            .expect(200)
            .expect(res => {
                console.log(res.body);
            })
            .end(done);
    })
});