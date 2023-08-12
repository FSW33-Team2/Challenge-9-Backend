const { User, Game, Score } = require("../database/models");

module.exports = class ScoreControllers {
  async UpdateScore(req, res, next) {
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

      const findLastScore = await Score.findOne({
        where: {
          userId: id,
          gameId: gameId,
        },
      });

      if (findLastScore) {
        const getScore = await Score.create({
          userId: id,
          gameId: gameId,
          score,
        });
        if (getScore) {
          if (score == 1) {
            return res.status(200).json({
              result: "Success",
              message: `Player with id: ${id} win`,
            });
          } else if (score == 0) {
            return res.status(200).json({
              result: "Success",
              message: `Player with id: ${id} lose`,
            });
          }
        } else {
          return res.status(500).json({
            result: "failed",
            message: "Failed to get",
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }

  async TotalScore(req, res, next) {
    try {
      const { id } = req.params;
      const score = await Score.findAll({
        where: {
          userId: id,
        },
      });
      if (score) {
        let scoreArr = [];
        score.forEach((score) => {
          scoreArr.push(score.score);
        });
        return res.status(200).json({
          result: "Success",
          totalScore: scoreArr.reduce((partialSum, a) => partialSum + a),
        });
      }
    } catch (error) {
      next(error);
    }
  }

  async TotalScoreInGame(req, res, next) {
    try {
      const { id, gameId } = req.params;
      const score = await Score.findAll({
        where: {
          userId: id,
          gameId,
        },
      });
      if (score) {
        let scoreArr = [];
        score.forEach((score) => {
          scoreArr.push(score.score);
        });
        return res.status(200).json({
          result: "Success",
          totalScore: scoreArr.reduce((partialSum, a) => partialSum + a),
        });
      }
    } catch (error) {
      next(error);
    }
  }
};
