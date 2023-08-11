const { Game, User, Score } = require("../database/models");

module.exports = class PlayerControllers {
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

  async getPlayer(req, res, next) {
    try {
      const { id } = req.params;
      const player = await User.findByPk(id);
      if (player) {
        return res.status(200).json({
          status: "Success",
          data: player,
        });
      } else {
        return res.status(404).json({
          result: "Not found",
          message: `Player with ${id} not found`,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async updatePlayer(req, res, next) {
    try {
      const { id } = req.params;
      const data = await User.findByPk(id);
      if (!data)
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        });
      const updatePlayer = await User.update(req.body, {
        where: { id: id },
      });
      if (updatePlayer == 1) {
        return res.status(200).json({
          result: "Success",
          message: `Player with id: ${id} successfully updated`,
        });
      } else {
        return res.status(500).json({
          result: "failed",
          message: "Failed to update",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async score(req, res, next) {
    try {
      const { id, gameId } = req.params;
      const { score } = req.body;
      const player = await User.findByPk(id);
      const game = await Game.findOne({
        where: {
          id: gameId,
        },
      });
      if (!player)
        return res.status(404).json({
          result: "Not found",
          message: `Player with id: ${id} not found`,
        });
      if (!game)
        return res.status(404).json({
          result: "Not found",
          message: `Game is not exist`,
        });
      const getScore = await Score.create({
        userId: id,
        gameId: gameId,
        score,
      });
      if (getScore) {
        return res.status(200).json({
          result: "Success",
          message: `Player with id: ${id} has get score: ${score}`,
        });
      } else {
        return res.status(500).json({
          result: "failed",
          message: "Failed to get",
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
