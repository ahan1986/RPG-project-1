const request = require('supertest'),
        app = require('../index.js');

describe('login Page"s top 5', () => {
    it("should just load and pass", (done) => {
        request(app).get("/api/top5")
            .expect(200, done);
    })
})