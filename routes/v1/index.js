const playerRouter = require("./player_routes");
const gameRouter = require("./game_routes")
const v1 = require("express").Router();

v1.use("/player", playerRouter);
v1.use("/", gameRouter);

module.exports = v1;