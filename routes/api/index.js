const playerRouter = require("./player.routes");
const gameRouter = require("./game.routes");
const scoreRouter = require("./score.routes");
const api = require("express").Router();

api.use("/player", playerRouter);
api.use("/game", gameRouter);
api.use("/score", scoreRouter);

module.exports = api;
