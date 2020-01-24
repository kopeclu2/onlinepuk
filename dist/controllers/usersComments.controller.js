"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _user = _interopRequireDefault(require("../services/user.service"));

var _authorize = _interopRequireDefault(require("../_helpers/authorize"));

var _role = _interopRequireDefault(require("../_helpers/role"));

var _comment = _interopRequireDefault(require("../services/comment.service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var router = _express["default"].Router();

// routes
router.post('/addComment', (0, _authorize["default"])(_role["default"].User), addComment); // admin only

router.post('/:id/editComment', (0, _authorize["default"])(_role["default"].User), editComment); // admin only

router.post('/:id/getCommentById', getCommentById); // admin only

function addComment(_x, _x2, _x3) {
  return _addComment.apply(this, arguments);
}

function _addComment() {
  _addComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
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
  _editComment = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res, next) {
    var result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
  _getCommentById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var id, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
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