"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _matches = _interopRequireDefault(require("../services/matches.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _teams = _interopRequireDefault(require("../services/teams.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

router.get('/all', getAllTeams);
router.get('/:id', getTeamById);

function getAllTeams(req, res) {
  _teams["default"].getAllTeams(req, res);
}

function getTeamById(_x, _x2) {
  return _getTeamById.apply(this, arguments);
}

function _getTeamById() {
  _getTeamById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = parseInt(req.params.id);
            _context.next = 3;
            return _teams["default"].getTeamById(id);

          case 3:
            result = _context.sent;
            res.send(result);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getTeamById.apply(this, arguments);
}

var _default = router;
exports["default"] = _default;