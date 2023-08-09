'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            const { Score } = models;
            User.hasMany(Score, { foreignKey: 'userId' })
        }
    }
    User.init({
        id: DataTypes.INTEGER,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        createdAt: DataTypes.Date,
        updateAt: DataTypes.Date
    }, {
        sequelize,
        tableName: 'users',
    });
    return User;
};