const request = require('supertest'),
        app = require('../index.js'),
        chaiHttp = require('chai-http'),
        chai = require('chai'),
        expect = chai.expect;
const db = require('../models');

        chai.use(chaiHttp);

describe('api-routes', () => {
    it("should grab random opponents", (done) => {
        let login = {
            nameId: "john",
            pass: "smith1234"
        }
        chai.request('http://localhost:8080')
            .post('/api/opponent')
            .send(login)
            .end((err, res) => {
                res.chai.should().have.status(200);
                done();
            })
    })
});