const { User, Game, Score, sequelize } = require("../database/models");

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

      if (player && game) {
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
      if (score.length === 0) {
        return res.status(500).json({
          result: "failed",
          message: "This player didnt have score",
        });
      } else {
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
      if (score.length === 0) {
        return res.status(500).json({
          result: "failed",
          message: "This player didnt have score",
        });
      } else {
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

  async TotalScoreLeaderboard(req, res, next){
    try{
      const { gameId } = req.params;
      const score = await Score.findAll({
        // attributes: [
        //   'userId',
        //   [sequelize.fn('sum', sequelize.col('score')), 'total_amount'],
        // ],
        include: User,
        // group: ['userId'],
        // raw: true
      });

      console.log(score);
      
      var result = [];
      score.reduce(function(res, value) {
        if (!res[value.userId]) {
          res[value.userId] = { userId: value.userId, score: 0 , username:"" };
          result.push(res[value.userId])
        }
        res[value.userId].score += value.score;
        res[value.userId].username = value.User.username;
        return res;
      }, {});


      return res.status(200).json({
        status: "Success",
        data: result,
      });
      
    } catch (error) {
      next(error);
    }
  }
};
