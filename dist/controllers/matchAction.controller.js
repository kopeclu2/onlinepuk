"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _matches = _interopRequireDefault(require("../services/matches.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _matchActions = _interopRequireDefault(require("../services/matchActions.service"));

var router = _express["default"].Router();

router.get('', function (req, res) {
  _matches["default"].getAllMatches(req, res);
});
router.post('/addAction', (0, _authorize["default"])(_role["default"].Admin), addMatchAction);
router.post('/editAction', (0, _authorize["default"])(_role["default"].Admin), editMatchAction);
router.post('/deleteAction', (0, _authorize["default"])(_role["default"].Admin), deleteMatchAction);

function addMatchAction(_x, _x2) {
  return _addMatchAction.apply(this, arguments);
}

function _addMatchAction() {
  _addMatchAction = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _matchActions["default"].addAction(req)["catch"](function (err) {
              return res.status(400).send({
                message: 'Pridani akce se nezdarilo'
              });
            });

          case 2:
            result = _context.sent;
            res.send(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addMatchAction.apply(this, arguments);
}

function editMatchAction(_x3, _x4) {
  return _editMatchAction.apply(this, arguments);
}

function _editMatchAction() {
  _editMatchAction = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _matchActions["default"].editAction(req)["catch"](function (err) {
              return res.status(400).send({
                message: 'Aktualiyace akce se nezdarilo'
              });
            });

          case 2:
            result = _context2.sent;
            res.send(result);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _editMatchAction.apply(this, arguments);
}

function deleteMatchAction(_x5, _x6) {
  return _deleteMatchAction.apply(this, arguments);
}

function _deleteMatchAction() {
  _deleteMatchAction = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _matchActions["default"].deleteAction(req)["catch"](function (err) {
              return res.status(400).send({
                message: 'Smazani akce se nezdarilo'
              });
            });

          case 2:
            result = _context3.sent;
            res.send(result);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _deleteMatchAction.apply(this, arguments);
}

var _default = router;
exports["default"] = _default;