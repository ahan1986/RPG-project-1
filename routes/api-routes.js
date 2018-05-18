var db = require('../models');

module.exports = function(app) {
    app.get('/', function(req, res) {
        db.User.findAll({}).then(function(player) {
            
            let UserObject = {
                username: player
            }
            res.render('landingPage', UserObject);
        });
    });

    app.get('/api/user', function(req, res) {
        var nameId = req.body.username;
        var pass = req.body.password;
        db.User.findAll({
            where: {
                username: nameId,
                password: pass
            }
        }).then(function(event) {
            res.json(event);
        })
    })

    // Adding a new user
    app.post('/api/login', function(req, res) {
        console.log(req.body);
        User.create({
            username: req.body.username,
            password: req.body.password
        });
    });
    app.post('/api/')

//End of the module.exports function
}