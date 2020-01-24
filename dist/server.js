"use strict";

var _errorHandler = _interopRequireDefault(require("./_helpers/error-handler"));

var _users = _interopRequireDefault(require("./controllers/users.controller"));

var _matches = _interopRequireDefault(require("./controllers/matches.controller"));

var _connectionDb = _interopRequireDefault(require("./_helpers/connectionDb"));

var _teams = _interopRequireDefault(require("./controllers/teams.controller"));

var _usersComments = _interopRequireDefault(require("./controllers/usersComments.controller"));

var _matchAction = _interopRequireDefault(require("./controllers/matchAction.controller"));

var _http = _interopRequireDefault(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _socketioAuth = _interopRequireDefault(require("socketio-auth"));

var _socketioJwt = _interopRequireDefault(require("socketio-jwt"));

var _config = _interopRequireDefault(require("./config.json"));

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _path = _interopRequireDefault(require("path"));

var _matches2 = _interopRequireDefault(require("./services/matches.service"));

var _matchActions = _interopRequireDefault(require("./services/matchActions.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('rootpath')();

var express = require('express');

var app = express();

var cors = require('cors');

var bodyParser = require('body-parser');

var serverIO = _http["default"].createServer(app);

var io = (0, _socket["default"])(serverIO);

_connectionDb["default"].connect();

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors()); // api routes

app.use('/users', _users["default"]);
app.use(express["static"](_path["default"].join(__dirname, 'client/build')));
app.use('/matches', _matches["default"]);
app.use('/teams', _teams["default"]);
app.use('/comment', _usersComments["default"]);
app.use('/actions', _matchAction["default"]); // global error handler

app.use(_errorHandler["default"]);
io.on('connection', function (socket) {
  socket.on('goalScoreAdmin', function (_ref) {
    var token = _ref.token,
        match = _ref.match;

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _connectionDb["default"].connection.query('SELECT id, role from users WHERE id = ? ', [decoded.sub], function (err, result) {
          if (result[0].role === 'Admin') {
            _matches2["default"].editMatchScore(match).then(function () {
              _matches2["default"].getMatch(match.id).then(function (match) {
                var findedMatch = match[0];
                socket.broadcast.emit('goal', {
                  id: findedMatch.id,
                  scoreHome: findedMatch.scoreHome,
                  scoreHost: findedMatch.scoreHost
                });
              });
            })["catch"](function (err) {
              return console.log('PROMISE', err);
            });
          }
        });
      }
    });
  });
});
serverIO.listen(process.env.PORT || 4000, function () {
  console.log('listen');
});