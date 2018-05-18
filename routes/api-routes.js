var db = require('../models');

module.exports = function(app) {
    app.get('/', function(req, res) {
        db.User.findAll({
            limit: 10
            // order: [
            //     'username', 'DESC'
            // ]
        }).then(function(player) {
            res.render('landingPage', player);
        });
    });
//when user clicks on 'Login' in the landingPage, it will navigate to gamePlay.handlebars
    app.get('/gamePlay', function(req, res) {
        res.render('gamePlay');
    });
// when user clicks on 'Create Your Warrior' in the landingPage, it will navigate to createWarrior.handlbars
    app.get('/createWarrior', function(req, res) {
        res.render('createWarrior');
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

    app.get('/api/opponent', function(req, res) {
        db.User.findAll({

        })
    })

    // Adding a new user
    app.post('/api/user', function(req, res) {
        console.log(req.body);
        User.create({
            username: req.body.username,
            password: req.body.password
        });
    });
    

//End of the module.exports function
}