const PlayerController = require("../../controllers/player.controller");
const PlayerControl = new PlayerController();
const playerRouter = require("express").Router();

playerRouter.get("/", PlayerControl.getGameTable);
playerRouter.post("/:gameId/:id", PlayerControl.score);

module.exports = playerRouter;
