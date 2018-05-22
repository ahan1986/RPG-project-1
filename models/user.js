module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isUnique: function(value, next) {
                    var self = this;
                    User.find({where: {username: value}})
                        .then(function(user) {
                            if(user && self.id !== user.id) {
                                return next('Username already in use!');
                            }
                            return next();
                        })
                        .catch(function(err) {
                            return next(err);
                        });
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "ERR-PASS"
            }
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



