require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
import errorHandler from "./_helpers/error-handler";
import userController from "./controllers/users.controller";
import matchController from "./controllers/matches.controller";
import db from "./_helpers/connectionDb";
import teamsController from "./controllers/teams.controller";
import commentController from "./controllers/usersComments.controller";
import matchActionController from "./controllers/matchAction.controller";
import chatRoomCotnroller from "./controllers/chatRoomController";
import http from "http";
import socketio from "socket.io";
import config from "./config.json";
import jwt from "jsonwebtoken";
import path from "path";
import matchesService from "./services/matches.service";
import { User } from "./models/User";
import {chatWebSocket, getAllComments, verifyTokenUSer } from "./services/chatRoomWSService";
import { ChatRoomComment } from "./models/ChatRoomComment";
import { isNil } from "ramda";
import logger from 'heroku-logger'
import { matchWSService } from "./services/matchWSService";
const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Lukasek:Monstercar494@onlinepuk-9lent.mongodb.net/test?retryWrites=true&w=majority";
const mongoLab = "mongodb://Lukas:Monstercar494@ds155218.mlab.com:55218/heroku_kskj9hw8"
mongoose.connect(mongoLab, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
let dbMongo = mongoose.connection;

dbMongo.once("open", () => {
  console.log("MONGO CONNECTED");
});
dbMongo.on("error", err => {
  console.log(err);
});

var serverIO = http.createServer(app);
const io = socketio(serverIO);

try {
  db.connect();
} catch (err) {
  console.log('ERRRRRR',err);
}
logger.debug(process.env.PORT_ID)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// api routes
app.use(express.static(path.join(__dirname, "/../frontend/build")));
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  console.log(path.dirname(require.main.filename));
});/*
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/public/index.html"));
  console.log(path.dirname(require.main.filename));
});*/
app.use("/users", userController);

app.use("/matches", matchController);
app.use("/teams", teamsController);
app.use("/comment", commentController);
app.use("/actions", matchActionController);
app.use("/chatRoom", chatRoomCotnroller);
// global error handler
app.use(errorHandler);

io.on("connection", function(socket) {
  matchWSService(socket)
  chatWebSocket(socket);
});
var port = process.env.PORT || 4000;

serverIO.listen(port, () => {
  logger.info(`Starting server ON ${port} @@@@@@CONNNNECT"""""`)
  console.log(`listen on port ${port}`);
});
