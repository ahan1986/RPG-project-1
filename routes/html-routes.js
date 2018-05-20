// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
var db = require('../models');

// Routes
// =============================================================
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

};
