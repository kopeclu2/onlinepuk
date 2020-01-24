"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getAllTeams = function getAllTeams(req, res) {
  _connectionDb["default"].connection.query("SELECT * FROM teams", function (err, result, fields) {
    res.send(result);
  });
};

var getTeamById =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (res, rej) {
              return _connectionDb["default"].connection.query("SELECT * FROM teams WHERE id = ? ", [id], function (err, result, fields) {
                res(result);
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
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(id, callB) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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