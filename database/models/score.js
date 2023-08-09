'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Score extends Model {
        static associate(models) {
            const { User, Game } = models;
            Score.belongsTo(User, { foreignKey: 'id' })
            Score.belongsTo(Game, { foreignKey: 'gameId' })
        }
    }
    Score.init({
        id: DataTypes.INTEGER,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                key: 'id',
                model: {
                    tableName: 'user',
                },
            },
            onDelete: 'SET NULL',
        },
        gameId: DataTypes.INTEGER,
        score: DataTypes.INTEGER,
        createdAt: DataTypes.Date,
        updateAt: DataTypes.Date
    }, {
        sequelize,
        tableName: 'users',
    });
    return User;
};