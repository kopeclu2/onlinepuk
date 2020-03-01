"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

var getAllTeams = function getAllTeams(req, res) {
  _connectionDb["default"].connection.query("SELECT * FROM teams", function (err, result, fields) {
    res.send(result);
  });
};

var getTeamById =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(id) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (res, rej) {
              return _connectionDb["default"].connection.query("SELECT * FROM teams WHERE id = ? ", [id], function (err, result, fields) {
                if (!err) res(result);else rej(new Error('Nezdařilo se najít zápas'));
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTeamById(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getTeamByIdCallBack =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(id, callB) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _connectionDb["default"].connection.query("SELECT * FROM teams WHERE id = ? ", [id], function (err, result, fields) {
              callB(result);
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getTeamByIdCallBack(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = {
  getAllTeams: getAllTeams,
  getTeamById: getTeamById,
  getTeamByIdCallBack: getTeamByIdCallBack
};
exports["default"] = _default;