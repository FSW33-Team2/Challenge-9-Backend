const PlayerController = require("../../controllers/player.controller");
const PlayerControl = new PlayerController()
const playerRouter = require("express").Router();

playerRouter.get("/:id", PlayerControl.getPlayer);
playerRouter.put("/:id", PlayerControl.updatePlayer);

module.exports = playerRouter;