const { Game } = require("../database/models");

module.exports = class GameControllers {
  async getGameTable(req, res, next) {
    try {
      const gameList = await Game.findAll();
      if (gameList) {
        return res.status(200).json({
          result: "Success",
          gameList,
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
