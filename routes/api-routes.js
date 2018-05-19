var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../models');

module.exports = function(app) {
    app.get('/', function(req, res) {
        db.User.findAll({
            limit: 10,
            order: [['username', 'DESC']]
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
//the username and password has to match with what we have in the database, then it will spit out the object of stats to client-side
    app.get('/api/user', function(req, res) {
        var nameId = req.body.username;
        var pass = req.body.password;
        db.User.find({
            where: {
                username: nameId,
                password: pass
            },
            attributes: { //attributes query in sequelize to send back to us all the data but the password
                exclude: ['password']
            }
        }).then(function(event) {
            res.json(event);
        })
    })
    // grabbing the top 5 players from the database
    app.get('/api/top5', (req, res) => {
        db.User.findAll({
            order: [['level', 'DESC']], //displays the highest to lowest
            limit: 5 // limit only 5 players
        }).then((event) => {
            res.json(event);
        });
    });

//grabbing random opponent that is equal to or greater than the user's level
    app.get('/api/opponent/:level', (req, res) => {
        let baseLevel = req.params.level;
        //still need to find a way to grab the current users character and make sure the random opponent does not equal the user's character
        console.log(baseLevel);
        
        db.User.findAll({
            where: {
                level: {
                    [Op.gte]: baseLevel
                }
            },
            attributes: {
                exclude: ['password']
            }
        }).then((random) => {
            const opponentLength = random.length;
            
            console.log(opponentLength);
            
            const i = Math.floor(Math.random() * opponentLength);
            
            console.log(i);

            res.json(random[i]);
        });
    });
    //============================================================
//Method ONE is we don't want to use code with the front end when it comes to adding the experience points to the players and sending it back to this side

    //updating winner's stats
    // app.get('/api/user/wins', (req,res) => {
    //     let winner1 = req.body;
    //     db.User.update(winner1, {
    //         where: {
    //             id: req.body.id 
    //         }
    //     }).then((champ) => {
    //         res.json(champ);
    //     });
    // });
    // //updating the loser's stats
    // app.get('/api/user/losses', (req,res) => {
    //     let loser1 = req.body;
    //     db.User.update(loser1, {
    //         where: {
    //             id: req.body.id
    //         }
    //     }).then((loser) => {
    //         res.json(loser);
    //     })
    // })

    //============================================================
    //Method TWO is to add the winner and loser's characters stats using {level: Sequelize.literal('level + 2')}, {where: {id: 1}}
        //updating winner's stats

        app.get('/api/user/wins', (req,res) => {
            let winner1 = 2;
            console.log(req.body);
            db.User.update({
                level: Sequelize.literal('level + 2'),
                experience: Sequelize.literal('experience + 2')
                }, {
                where: {
                    id: req.body.winner1 
                }
            }).then((champ) => {
                console.log(champ);
                res.json(champ);
            });
        });
        //updating the loser's stats
        app.get('/api/user/losses', (req,res) => {
            let loser1 = req.body;
            db.User.update(loser1, {
                where: {
                    id: req.body.id
                }
            }).then((loser) => {
                res.json(loser);
            })
        })

    //================================================================

    // Adding a new user
    app.post('/api/user', function(req, res) {
        console.log(req.body);
        db.User.create({
            username: req.body.username,
            password: req.body.password
        });
    });
    

//End of the module.exports function
}