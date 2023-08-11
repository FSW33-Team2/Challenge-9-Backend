"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      const { Score } = models;
      Game.hasMany(Score, { foreignKey: "gameId" });
    }
  }
  Game.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      tableName: "game",
    }
  );
  return Game;
};
