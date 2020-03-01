"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchWSService = void 0;

var _User = require("../models/User");

var _herokuLogger = _interopRequireDefault(require("heroku-logger"));

var _matches = _interopRequireDefault(require("./matches.service"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config.json"));

var matchWSService = function matchWSService(socket) {
  socket.on("goalScoreAdmin", function (_ref) {
    var token = _ref.token,
        match = _ref.match;

    _herokuLogger["default"].info("Match id:".concat(match.id, " goes CHANGES SCORE"));

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          if (user.role === "Admin") {
            _matches["default"].editMatchScore(match).then(function () {
              _matches["default"].getMatch(match.id).then(function (match) {
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

    _herokuLogger["default"].info("Match id:".concat(match.id, " goes LIVE"));

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          if (user.role === "Admin") {
            _matches["default"].setLiveMatch(match, liveValue).then(function () {
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

    _herokuLogger["default"].info("Match id:".concat(match.id, " goes finished"));

    _jsonwebtoken["default"].verify(token, _config["default"].secret, function (err, decoded) {
      if (!err) {
        _User.User.findById(decoded.sub, function (err, user) {
          if (user.role === "Admin") {
            _matches["default"].setMatchFinished(match, finishedValue).then(function () {
              return finishedValue && socket.broadcast.emit("finishedSuccess", {
                match: match
              });
            })["catch"](function () {});
          }
        });
      }
    });
  });
};

exports.matchWSService = matchWSService;