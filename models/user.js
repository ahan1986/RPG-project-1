module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
   
        },
        avatarID: {
            type: DataTypes.INTEGER,
            allowNull: false     
        },
        health: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        strength: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        level: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        experience: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        skill_points: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        wins: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        losses: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    })
    return User;
}



