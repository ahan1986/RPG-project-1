var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../models');

module.exports = function(app) {
//the username and password has to match with what we have in the database, then it will spit out the object of stats to client-side
    app.post('/api/login', function(req, res) {
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
        }).catch((err) => {
            res.json(err);
            // res.statusCode(500).json(err);
        });
    });
    // grabbing the top 5 players from the database
    app.get('/api/top5', (req, res) => {
        db.User.findAll({
            order: [['level', 'DESC']], //displays the highest to lowest
            limit: 5, // limit only 5 players
            attributes: {
                exclude: ['password']
            }
        }).then((event) => {
            res.json(event);
        });
    });

//grabbing random opponent that is equal to or greater than the user's level
    app.post('/api/opponent/', (req, res) => {
        let baseLevel = req.body.level;
        let exOpponents = req.body.fought;
        // let baseLevel = 36;
        // let exOpponents = ['john', 'bob'];
        //still need to find a way to grab the current users character and make sure the random opponent does not equal the user's character
        // console.log(baseLevel);
        db.User.findAll({
            where: {
                level: {
                    [Op.gte]: baseLevel
                },
                username: {
                    [Op.notIn]: exOpponents
                }
            },
            attributes: {
                exclude: ['password']
            }
        }).then((random) => {   
            const opponentLength = random.length;
            const bobby = Math.floor(Math.random() * opponentLength);

            const randomOpponent = [];
            for (var i =0; i<opponentLength; i++) {
                randomOpponent.push(random[i].dataValues);
            }
            // console.log('hello');
            // console.log(randomOpponent[bobby]);
            res.json(randomOpponent[bobby]);
        });
    });
    //============================================================
//Method ONE is we don't want to use code with the front end when it comes to adding the experience points to the players and sending it back to this side

    //updating winner's stats
    app.get('/api/user/wins', (req,res) => {
        let winner1 = req.body;
        db.User.update(winner1, {
            where: {
                id: req.body.id 
            }
        }).then((champ) => {
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
        });
    });

    //============================================================
    //Method TWO is to add the winner and loser's characters stats using {level: Sequelize.literal('level + 2')}, {where: {id: 1}}
        //updating winner's stats

        // app.get('/api/user/wins', (req,res) => {
        //     let winner1 = 2;
        //     console.log(req.body);
        //     db.User.update({
        //         level: Sequelize.literal('level + 2'),
        //         experience: Sequelize.literal('experience + 2')
        //         }, {
        //         where: {
        //             id: req.body.winner1 
        //         }
        //     }).then((champ) => {
        //         console.log(champ);
        //         res.json(champ);
        //     });
        // });
        //updating the loser's stats
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

    //================================================================

    // Adding a new user
    app.post('/api/user', function(req, res) {
        console.log(req.body);
        db.User.findOrCreate({
            where:  {
                username: req.body.username,
                password: req.body.password,
                avatarID: req.body.avatarID,
                speed: req.body.speed,
                health: req.body.health,
                strength: req.body.strength
            },

        }).then((post) => {
            res.json(post);
        });
    });
    

//End of the module.exports function
}