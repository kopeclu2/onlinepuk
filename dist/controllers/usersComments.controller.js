"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _comment = _interopRequireDefault(require("../services/comment.service"));

var router = _express["default"].Router();

// routes
router.post('/addComment', (0, _authorize["default"])(_role["default"].User), addComment); // admin only

router.post('/:id/editComment', (0, _authorize["default"])(_role["default"].User), editComment); // admin only

router.post('/:id/getCommentById', getCommentById); // admin only

function addComment(_x, _x2, _x3) {
  return _addComment.apply(this, arguments);
}

function _addComment() {
  _addComment = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _comment["default"].addCommnet(req)["catch"](function (err) {
              return res.status(400).send({
                message: 'Něco se nezdařilo'
              });
            });

          case 2:
            result = _context.sent;
            res.send({
              message: result
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _addComment.apply(this, arguments);
}

function editComment(_x4, _x5, _x6) {
  return _editComment.apply(this, arguments);
}

function _editComment() {
  _editComment = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _comment["default"].editComment(req)["catch"](function (err) {
              return res.status(400).send({
                message: 'Něco se nezdařilo'
              });
            });

          case 2:
            result = _context2.sent;
            res.send({
              message: result
            });

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _editComment.apply(this, arguments);
}

function getCommentById(_x7, _x8) {
  return _getCommentById.apply(this, arguments);
}

function _getCommentById() {
  _getCommentById = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3(req, res) {
    var id, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = parseInt(req.params.id);
            _context3.next = 3;
            return _comment["default"].getCommentById(id).then(function (comment) {
              return res.send(comment);
            })["catch"](function (err) {
              return res.status(400).send({
                message: 'Něco se nezdařilo'
              });
            });

          case 3:
            result = _context3.sent;

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getCommentById.apply(this, arguments);
}

var _default = router;
exports["default"] = _default;