module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        avatarID: {
            type: DataTypes.INTEGER
        },
        health: {
            type: DataTypes.INTEGER
        },
        speed: {
            type: DataTypes.INTEGER
        },
        strength: {
            type: DataTypes.INTEGER
        },
        level: {
            type: DataTypes.INTEGER
        },
        experience: {
            type: DataTypes.INTEGER
        },
        skill_points: {
            type: DataTypes.INTEGER
        },
        wins: {
            type: DataTypes.INTEGER
        },
        losses: {
            type: DataTypes.INTEGER
        }
    })
    return User;
}



