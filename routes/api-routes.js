var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../models');

module.exports = function (app) {
    //the username and password has to match with what we have in the database, then it will spit out the object of stats to client-side
    app.post('/api/login', function (req, res) {
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
        }).then(function (event) {
            res.json(event);
        }).catch((err) => {
            res.json(err);
            // res.statusCode(500).json(err);
        });
    });

    //grabbing random opponent that is equal to or greater than the user's level
    app.post('/api/opponent/', (req, res) => {
        let baseLevel = req.body.level;
        let exOpponents = req.body.fought;
        let player = req.body.player;

        //if there are no ex-opponents in the array, set up an if/else statement to use sequelize search or else there will be that error with undefined 'length' in the terminal
        if (exOpponents !== undefined) {
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
                //Once collecting all the opponents that sequelize filtered out, the code below is to remove the user's player from the opponent list so there won't be a chance that it will be playing against itself.
                const opponentLength = random.length;
                const randomOpponent = [];
                for (var i = 0; i < opponentLength; i++) {
                    if (random[i].dataValues.username !== player) {
                        randomOpponent.push(random[i].dataValues);
                    }
                }
                const bobby = Math.floor(Math.random() * randomOpponent.length);
                res.json(randomOpponent[bobby]);
            });
        } else {
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
                const randomOpponent = [];
                for (var i = 0; i < opponentLength; i++) {
                    if (random[i].dataValues.username !== player) {
                        randomOpponent.push(random[i].dataValues);
                    }
                }
                const bobby = Math.floor(Math.random() * randomOpponent.length);
                res.json(randomOpponent[bobby]);
            });
        }
    });

    //updating the loser's stats
    app.put('/api/update', (req, res) => {
        let data = req.body;
        db.User.update(data, {
            where: {
                id: req.body.id
            }
        }).then((data) => {
            res.json(data);
        });
    });

    // Adding a new user
    app.post('/api/user', function (req, res) {
        // console.log(req.body);
        db.User.findOrCreate({
            where: {
                username: req.body.username,
                password: req.body.password,
                avatarID: req.body.avatarID,
                speed: req.body.speed,
                health: req.body.health,
                strength: req.body.strength
            },
            attributes: {
                exclude: ['password', 'updatedAt', 'createdAt']
            }
        }).then((post) => {
            let blob = [];
            for (var i = 0; i < post.length; i++) {
                blob.push(post[i].dataValues);
            };
            let jack = blob[0];
            res.json(jack);
        })
        //this catch is used to prevent the user to create a character's name that is already store in the database.  This will throw back the string "NO", which will be used in the front-end to show that the username is already in use
        .catch(function(err) {
            res.json("NO");
        })
    });
    //End of the module.exports function
}