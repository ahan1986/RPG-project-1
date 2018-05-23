const expect = require('chai').expect;
const request = require('supertest');
const app = require('../index.js');

describe('All the pages', () => {
    
        it('response is success for the login page', (done) => {
            request(app)
                .get('localhost:8080')
                .expect(200)
                .end(() => {
                    done();
                });
        })

        it('response is success for the game play page', (done) => {
            request(app)
                .get('localhost:8080/gamePlay')
                .expect(200)
                .end(() => {
                    done();
                });
        })

        it('response is success for the create warrior page', (done) => {
            request(app)
                .get('localhost:8080/createWarrior')
                .expect(200)
                .end(() => {
                    done();
                });
        })
    
});