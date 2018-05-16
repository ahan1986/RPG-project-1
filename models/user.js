var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var User = sequealize.define("user", {
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    avatarID: {
        type: Sequelize.INTEGER
    },
    health: {
        type: Sequelize.INTEGER
    },
    speed: {
        type: Sequelize.INTEGER
    },
    strength: {
        type: Sequelize.INTEGER
    },
    level: {
        type: Sequelize.INTEGER
    },
    experience: {
        type: Sequelize.INTEGER
    },
    skill_points: {
        type: Sequelize.INTEGER
    },
    wins: {
        type: Sequelize.INTEGER
    },
    losses: {
        type: Sequelize.INTEGER
    }
})

User.sync();

module.exports = User;
