"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _errorHandler = _interopRequireDefault(require("./_helpers/error-handler"));

var _users = _interopRequireDefault(require("./controllers/users.controller"));

var _matches = _interopRequireDefault(require("./controllers/matches.controller"));

var _connectionDb = _interopRequireDefault(require("./_helpers/connectionDb"));

var _teams = _interopRequireDefault(require("./controllers/teams.controller"));

var _usersComments = _interopRequireDefault(require("./controllers/usersComments.controller"));

var _matchAction = _interopRequireDefault(require("./controllers/matchAction.controller"));

var _chatRoomController = _interopRequireDefault(require("./controllers/chatRoomController"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _config = _interopRequireDefault(require("./config.json"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _path = _interopRequireDefault(require("path"));

var _matches2 = _interopRequireDefault(require("./services/matches.service"));

var _User = require("./models/User");

var _chatRoomWSService = require("./services/chatRoomWSService");

var _ChatRoomComment = require("./models/ChatRoomComment");

var _ramda = require("ramda");

require("rootpath")();

var express = require("express");

var app = express();

var cors = require("cors");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var uri = "mongodb+srv://Lukasek:Monstercar494@onlinepuk-9lent.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var dbMongo = mongoose.connection;
dbMongo.once("opne", function () {
  console.log("MONGO CONNECTED");
});
dbMongo.on("error", function (err) {
  console.log(err);
});

var serverIO = _http["default"].createServer(app);

var io = (0, _socket["default"])(serverIO);

try {
  _connectionDb["default"].connect();
} catch (err) {
  console.log(err);
}

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors()); // api routes

app.use(express["static"](_path["default"].join(__dirname, "/../frontend/build")));
app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname + "/../frontend/build/index.html"));
  console.log(_path["default"].dirname(require.main.filename));
});
app.use("/users", _users["default"]);
app.use("/matches", _matches["default"]);
app.use("/teams", _teams["default"]);
app.use("/comment", _usersComments["default"]);
app.use("/actions", _matchAction["default"]);
app.use("/chatRoom", _chatRoomController["default"]); // global error handler

app.use(_errorHandler["default"]);
io.on("connection", function (socket) {
  socket.on("goalScoreAdmin", function (_ref) {
    var token = _ref.token,
        match = _ref.match;

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          console.log("SUER WS", user);

          if (user.role === "Admin") {
            _matches2["default"].editMatchScore(match).then(function () {
              _matches2["default"].getMatch(match.id).then(function (match) {
                var findedMatch = match[0];
                socket.broadcast.emit("goal", {
                  id: findedMatch.id,
                  scoreHome: findedMatch.scoreHome,
                  scoreHost: findedMatch.scoreHost
                });
              });
            })["catch"](function (err) {
              return console.log("PROMISE", err);
            });
          }
        });
      }
    });
  });
  socket.on("matchGoLive", function (_ref2) {
    var token = _ref2.token,
        match = _ref2.match,
        liveValue = _ref2.liveValue;
    console.log(liveValue);

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          if (user.role === "Admin") {
            _matches2["default"].setLiveMatch(match, liveValue).then(function () {
              return liveValue && socket.broadcast.emit("liveSucces", {
                match: match
              });
            })["catch"](function () {});
          }
        });
      } else {
        console.log("ERROR WS", "color: red");
      }
    });
  });
  socket.on("matchGoFinished", function (_ref3) {
    var token = _ref3.token,
        match = _ref3.match,
        finishedValue = _ref3.finishedValue;
    console.log(finishedValue);

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          if (user.role === "Admin") {
            _matches2["default"].setMatchFinished(match, finishedValue).then(function () {
              return finishedValue && socket.broadcast.emit("finishedSuccess", {
                match: match
              });
            })["catch"](function () {});
          }
        });
      }
    });
  });
  (0, _chatRoomWSService.chatWebSocket)(socket);
});
var port = process.env.PORT || 8080;
serverIO.listen(port, function () {
  console.log("listen on port ".concat(port));
});