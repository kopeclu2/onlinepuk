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

var _herokuLogger = _interopRequireDefault(require("heroku-logger"));

var _matchWSService = require("./services/matchWSService");

require("rootpath")();

var express = require("express");

var app = express();

var cors = require("cors");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var uri = "mongodb+srv://Lukasek:Monstercar494@onlinepuk-9lent.mongodb.net/test?retryWrites=true&w=majority";
var mongoLab = "mongodb://Lukas:Monstercar494@ds155218.mlab.com:55218/heroku_kskj9hw8";
mongoose.connect(mongoLab, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var dbMongo = mongoose.connection;
dbMongo.once("open", function () {
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
  console.log('ERRRRRR', err);
}

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors()); // api routes

app.use(express["static"](_path["default"].join(__dirname, "/../frontend/build")));
/*app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/../frontend/build/index.html"));
  console.log(path.dirname(require.main.filename));
});*/

app.get("/", function (req, res) {
  res.sendFile(_path["default"].join(__dirname + "/../frontend/public/index.html"));
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
  (0, _matchWSService.matchWSService)(socket);
  (0, _chatRoomWSService.chatWebSocket)(socket);
});
var port = process.env.PORT || 4000;
serverIO.listen(port, function () {
  _herokuLogger["default"].info("Starting server ON ".concat(port, " @@@@@@CONNNNECT\"\"\"\"\""));

  console.log("listen on port ".concat(port));
});