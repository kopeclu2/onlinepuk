"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _matches = _interopRequireDefault(require("../services/matches.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _teams = _interopRequireDefault(require("../services/teams.service"));

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
  _getTeamById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
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