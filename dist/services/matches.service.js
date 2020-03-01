"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

var _teams = _interopRequireDefault(require("../services/teams.service"));

var _comment = _interopRequireDefault(require("../services/comment.service"));

var _matchActions = _interopRequireDefault(require("./matchActions.service"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var arrayToPush = new Array();

var selectAllFromMatches = function selectAllFromMatches() {
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query("SELECT * FROM matches ORDER BY date", [], function (err, result) {
      if (!err) {
        res(result);
      } else {
        rej();
      }
    });
  });
};

var selectAllFromMatchesFinished = function selectAllFromMatchesFinished() {
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query("SELECT * FROM matches WHERE finished = 1 ORDER BY date", [], function (err, result) {
      if (!err) {
        res(result);
      } else {
        rej();
      }
    });
  });
};

var getAllMatches =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var rows, arr, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, team, teamHome, teamHost, userMessages, actions;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return selectAllFromMatches();

          case 2:
            rows = _context.sent;
            arr = new Array();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;
            _iterator = rows[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 27;
              break;
            }

            team = _step.value;
            _context.next = 13;
            return _teams["default"].getTeamById(team.teamHome);

          case 13:
            teamHome = _context.sent;
            _context.next = 16;
            return _teams["default"].getTeamById(team.teamHost);

          case 16:
            teamHost = _context.sent;
            _context.next = 19;
            return _comment["default"].getTeamsUsersComments(team.id);

          case 19:
            userMessages = _context.sent;
            _context.next = 22;
            return _matchActions["default"].getActionsOfMatchById(team.id);

          case 22:
            actions = _context.sent;
            arr.push(_objectSpread({}, team, {
              teamHome: _objectSpread({}, teamHome[0]),
              teamHost: _objectSpread({}, teamHost[0]),
              userMessages: userMessages,
              actions: actions
            }));

          case 24:
            _iteratorNormalCompletion = true;
            _context.next = 9;
            break;

          case 27:
            _context.next = 33;
            break;

          case 29:
            _context.prev = 29;
            _context.t0 = _context["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 33:
            _context.prev = 33;
            _context.prev = 34;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 36:
            _context.prev = 36;

            if (!_didIteratorError) {
              _context.next = 39;
              break;
            }

            throw _iteratorError;

          case 39:
            return _context.finish(36);

          case 40:
            return _context.finish(33);

          case 41:
            res.send(arr);

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 29, 33, 41], [34,, 36, 40]]);
  }));

  return function getAllMatches(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getAllFinsihedMatches =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var rows, arr, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, team, teamHome, teamHost, userMessages, actions;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return selectAllFromMatchesFinished();

          case 2:
            rows = _context2.sent;
            arr = new Array();
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 7;
            _iterator2 = rows[Symbol.iterator]();

          case 9:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 27;
              break;
            }

            team = _step2.value;
            _context2.next = 13;
            return _teams["default"].getTeamById(team.teamHome);

          case 13:
            teamHome = _context2.sent;
            _context2.next = 16;
            return _teams["default"].getTeamById(team.teamHost);

          case 16:
            teamHost = _context2.sent;
            _context2.next = 19;
            return _comment["default"].getTeamsUsersComments(team.id);

          case 19:
            userMessages = _context2.sent;
            _context2.next = 22;
            return _matchActions["default"].getActionsOfMatchById(team.id);

          case 22:
            actions = _context2.sent;
            arr.push(_objectSpread({}, team, {
              teamHome: _objectSpread({}, teamHome[0]),
              teamHost: _objectSpread({}, teamHost[0]),
              userMessages: userMessages,
              actions: actions
            }));

          case 24:
            _iteratorNormalCompletion2 = true;
            _context2.next = 9;
            break;

          case 27:
            _context2.next = 33;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t0 = _context2["catch"](7);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 33:
            _context2.prev = 33;
            _context2.prev = 34;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 36:
            _context2.prev = 36;

            if (!_didIteratorError2) {
              _context2.next = 39;
              break;
            }

            throw _iteratorError2;

          case 39:
            return _context2.finish(36);

          case 40:
            return _context2.finish(33);

          case 41:
            res.send(arr);

          case 42:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 29, 33, 41], [34,, 36, 40]]);
  }));

  return function getAllFinsihedMatches(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var getMatchId =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var id, match, teamHome, teamHost, userMessages, actions;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = parseInt(req.params.id);
            _context3.next = 3;
            return getMatch(id);

          case 3:
            match = _context3.sent;
            _context3.next = 6;
            return _teams["default"].getTeamById(match[0].teamHome);

          case 6:
            teamHome = _context3.sent;
            _context3.next = 9;
            return _teams["default"].getTeamById(match[0].teamHost);

          case 9:
            teamHost = _context3.sent;
            _context3.next = 12;
            return _comment["default"].getTeamsUsersComments(id);

          case 12:
            userMessages = _context3.sent;
            _context3.next = 15;
            return _matchActions["default"].getActionsOfMatchById(id);

          case 15:
            actions = _context3.sent;
            res.send(_objectSpread({}, match[0], {
              teamHome: teamHome[0],
              teamHost: teamHost[0],
              actions: actions,
              userMessages: userMessages
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMatchId(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getMatch =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (res, rej) {
              _connectionDb["default"].connection.query("SELECT * FROM `matches` WHERE `id`= ?", [id], function (err, result, fields) {
                res(result);
              });
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getMatch(_x7) {
    return _ref4.apply(this, arguments);
  };
}();

var createMatch = function createMatch(req, res) {
  var _req$body = req.body,
      name = _req$body.name,
      teamHome = _req$body.teamHome,
      teamHost = _req$body.teamHost,
      scoreHost = _req$body.scoreHost,
      scoreHome = _req$body.scoreHome,
      date = _req$body.date,
      matchState = _req$body.matchState;

  _connectionDb["default"].connection.query("INSERT INTO matches(name,teamHome,teamHost,scoreHome,scoreHost,date,matchState,finished,stadion) VALUES (?,?,?,?,?,?,?,?,?)", [name, teamHome, teamHost, scoreHome, scoreHost, date, matchState, 0, 'DEFAULT VALUE'], function (err, result, fields) {
    if (err) {
      res.status(400).send({
        message: 'Nepodařilo se přidat zápas'
      });
    }

    getAllMatches(req, res);
  });
};

var setLiveMatch = function setLiveMatch(match, liveValue) {
  return new Promise(function (res, rej) {
    var value = liveValue ? 1 : 0;
    var neg = liveValue ? 0 : 1;
    console.log(value, match.id);

    _connectionDb["default"].connection.query('UPDATE matches SET live = ?, finished = ? WHERE id = ?', [value, neg, match.id], function (err, result) {
      if (err) {
        console.log(err);
        rej();
      } else {
        res();
      }
    });
  });
};

var setMatchFinished = function setMatchFinished(match, finshedvalue) {
  return new Promise(function (res, rej) {
    var value = finshedvalue ? 1 : 0;

    _connectionDb["default"].connection.query('UPDATE matches SET finished = ?, live = ? WHERE id = ?', [value, 0, match.id], function (err, result) {
      if (err) {
        console.log(err);
        rej();
      } else {
        res();
      }
    });
  });
};

var editMatch = function editMatch(req, res) {
  var id = parseInt(req.params.id);
  var _req$body2 = req.body,
      name = _req$body2.name,
      scoreHost = _req$body2.scoreHost,
      scoreHome = _req$body2.scoreHome,
      date = _req$body2.date,
      matchState = _req$body2.matchState,
      stadion = _req$body2.stadion,
      live = _req$body2.live,
      finished = _req$body2.finished;

  if ((0, _ramda.isEmpty)(req.body)) {
    res.status(400).json({
      message: "Prazdna body"
    });
    return;
  }

  var liveValue = live ? 1 : 0;
  var finishedValue = finished ? 1 : 0;

  _connectionDb["default"].connection.query("UPDATE `matches` SET name = ?, scoreHome = ?, scoreHost = ?, date = ?, matchState = ?, stadion = ?, live = ?, finished = ?   WHERE id= ? ", [name, scoreHome, scoreHost, date, matchState, stadion, liveValue, finishedValue, id], function (err, result, fields) {
    console.log(err);
    res.status(200).json({
      message: "Zapas byl uspesne editovan"
    });
  });
};

var editMatchScore = function editMatchScore(_ref5) {
  var scoreHome = _ref5.scoreHome,
      scoreHost = _ref5.scoreHost,
      id = _ref5.id;
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query("UPDATE `matches` SET scoreHome = ?, scoreHost = ? WHERE id= ?", [scoreHome, scoreHost, id], function (err, result, fields) {
      if (err) {
        rej(err);
      }

      res();
    });
  });
};

var deleteMatch = function deleteMatch(req, res) {
  var id = parseInt(req.params.id);

  _connectionDb["default"].connection.query("DELETE FROM `matches` WHERE id = ?", [id], function (err, result) {
    if (err) {
      res.status(400).json({
        message: "Smazani se nepodarilo"
      });
    } else {
      res.send({
        message: "Zapas uspesne smazan"
      });
    }
  });
};

var _default = {
  deleteMatch: deleteMatch,
  getAllMatches: getAllMatches,
  getMatchId: getMatchId,
  createMatch: createMatch,
  editMatch: editMatch,
  editMatchScore: editMatchScore,
  getMatch: getMatch,
  getAllFinsihedMatches: getAllFinsihedMatches,
  setLiveMatch: setLiveMatch,
  setMatchFinished: setMatchFinished
};
exports["default"] = _default;