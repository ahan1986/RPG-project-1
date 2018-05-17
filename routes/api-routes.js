var User = require('../models/user');

module.exports = function(app) {
    // Adding a new user
    app.post('/api/login', function(req, res) {
        console.log(req.body);
        User.create({
            username: req.body.username,
            password: req.body.password
        })
    })
}