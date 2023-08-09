const PlayerController = require("../../controllers/player.controller");
const PlayerControl = new PlayerController()
const playerRouter = require("express").Router();

playerRouter.get("/", PlayerControl.getGameTable);

module.exports = playerRouter;