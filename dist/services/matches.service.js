"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

var _teams = _interopRequireDefault(require("../services/teams.service"));

var _comment = _interopRequireDefault(require("../services/comment.service"));

var _matchActions = _interopRequireDefault(require("./matchActions.service"));

var _connectionDb2 = require("../_helpers/connectionDb2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var arrayToPush = new Array();

var getAllMatches =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var _ref2, _ref3, rows, fields, err, a, arr, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, team, _ref4, _ref5, teamHome, _ref6, _ref7, teamHost, userMessages, actions;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _connectionDb2.promisePool.query("SELECT * FROM matches");

          case 2:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 4);
            rows = _ref3[0];
            fields = _ref3[1];
            err = _ref3[2];
            a = _ref3[3];
            arr = new Array();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = rows[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 36;
              break;
            }

            team = _step.value;
            _context.next = 18;
            return _connectionDb2.promisePool.query("SELECT * FROM teams WHERE id =?", [team.teamHome]);

          case 18:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 1);
            teamHome = _ref5[0];
            _context.next = 23;
            return _connectionDb2.promisePool.query("SELECT * FROM teams WHERE id =?", [team.teamHost]);

          case 23:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 1);
            teamHost = _ref7[0];
            _context.next = 28;
            return _comment["default"].getTeamsUsersComments(team.id);

          case 28:
            userMessages = _context.sent;
            _context.next = 31;
            return _matchActions["default"].getActionsOfMatchById(team.id);

          case 31:
            actions = _context.sent;
            arr.push(_objectSpread({}, team, {
              teamHome: _objectSpread({}, teamHome[0]),
              teamHost: _objectSpread({}, teamHost[0]),
              userMessages: userMessages,
              actions: actions
            }));

          case 33:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 36:
            _context.next = 42;
            break;

          case 38:
            _context.prev = 38;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 42:
            _context.prev = 42;
            _context.prev = 43;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 45:
            _context.prev = 45;

            if (!_didIteratorError) {
              _context.next = 48;
              break;
            }

            throw _iteratorError;

          case 48:
            return _context.finish(45);

          case 49:
            return _context.finish(42);

          case 50:
            res.send(arr);

          case 51:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 38, 42, 50], [43,, 45, 49]]);
  }));

  return function getAllMatches(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getMatchId =
/*#__PURE__*/
function () {
  var _ref8 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, match, teamHome, teamHost, userMessages, actions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = parseInt(req.params.id);
            _context2.next = 3;
            return getMatch(id);

          case 3:
            match = _context2.sent;
            _context2.next = 6;
            return _teams["default"].getTeamById(match[0].teamHome);

          case 6:
            teamHome = _context2.sent;
            _context2.next = 9;
            return _teams["default"].getTeamById(match[0].teamHost);

          case 9:
            teamHost = _context2.sent;
            _context2.next = 12;
            return _comment["default"].getTeamsUsersComments(id);

          case 12:
            userMessages = _context2.sent;
            _context2.next = 15;
            return _matchActions["default"].getActionsOfMatchById(id);

          case 15:
            actions = _context2.sent;
            res.send(_objectSpread({}, match[0], {
              teamHome: teamHome[0],
              teamHost: teamHost[0],
              actions: actions,
              userMessages: userMessages
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getMatchId(_x3, _x4) {
    return _ref8.apply(this, arguments);
  };
}();

var getMatch =
/*#__PURE__*/
function () {
  var _ref9 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(id) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new Promise(function (res, rej) {
              _connectionDb["default"].connection.query("SELECT * FROM `matches` WHERE `id`= ?", [id], function (err, result, fields) {
                res(result);
              });
            }));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getMatch(_x5) {
    return _ref9.apply(this, arguments);
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

  _connectionDb["default"].connection.query("INSERT INTO `matches`(name,teamHome,teamHost,scoreHome,scoreHost,date,matchState) VALUES (?,?,?,?,?,?,?)", [name, teamHome, teamHost, scoreHome, scoreHost, date, matchState], function (err, result, fields) {
    getAllMatches(req, res);
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
      stadion = _req$body2.stadion;

  if ((0, _ramda.isEmpty)(req.body)) {
    res.status(400).json({
      message: "Prazdna body"
    });
    return;
  }

  _connectionDb["default"].connection.query("UPDATE `matches` SET name = ?, scoreHome = ?, scoreHost = ?, date = ?, matchState = ?, stadion = ?  WHERE id= ? ", [name, scoreHome, scoreHost, date, matchState, stadion, id], function (err, result, fields) {
    res.status(200).json({
      message: "Zapas byl uspesne editovan"
    });
  });
};

var editMatchScore = function editMatchScore(_ref10) {
  var scoreHome = _ref10.scoreHome,
      scoreHost = _ref10.scoreHost,
      id = _ref10.id;
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
  getMatch: getMatch
};
exports["default"] = _default;