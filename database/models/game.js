'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Game extends Model {
        static associate(models) {
            const { Score } = models;
            Game.hasMany(Score, { foreignKey: 'gameId' })
        }
    }
    Game.init({
        id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        createdAt: DataTypes.Date,
        updateAt: DataTypes.Date
    }, {
        sequelize,
        tableName: 'users',
    });
    return User;
};