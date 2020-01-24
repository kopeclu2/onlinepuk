"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var addCommnet = function addCommnet(_ref) {
  var user = _ref.user,
      body = _ref.body;
  return new Promise(function (res, rej) {
    return _connectionDb["default"].connection.query("INSERT INTO matchuserscomments(user,content,date,matchId) VALUES(?,?,?,?)", [user.sub, body.content, body.date, body.matchId], function (err, result) {
      if ((0, _ramda.isNil)(err)) {
        res("Komentář byl úspěšně přidán");
      } else {
        rej(new Error("Komentář byl úspěšně přidán"));
      }
    });
  });
};

var editComment =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref2) {
    var user, body, params, id;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref2.user, body = _ref2.body, params = _ref2.params;
            id = parseInt(params.id);
            return _context.abrupt("return", new Promise(function (res, rej) {
              getCommentById(id).then(function (comment) {
                if (comment[0].user === user.sub) {
                  _connectionDb["default"].connection.query("UPDATE matchuserscomments SET content = ?, date = ? WHERE comment_id = ? AND user = ?", [body.content, body.date, id, user.sub], function (err, result, fields) {
                    var ok = _objectSpread({}, fields);

                    if ((0, _ramda.isNil)(err)) {
                      res("Komentář byl úspěšně aktualizovan");
                    } else {
                      rej(new Error(""));
                    }
                  });
                } else {
                  rej(new Error(""));
                }
              });
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function editComment(_x) {
    return _ref3.apply(this, arguments);
  };
}();

var getTeamsUsersComments = function getTeamsUsersComments(id) {
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query("SELECT matchuserscomments.comment_id,matchuserscomments.user, matchuserscomments.content,matchuserscomments.date, users.id,users.username,users.user_img,users.email  FROM matchuserscomments INNER JOIN users ON matchuserscomments.user = users.id WHERE matchuserscomments.matchId = ?", [id], function (err, result) {
      res(result);
    });
  });
};

var getCommentById = function getCommentById(id) {
  return new Promise(function (res, rej) {
    return _connectionDb["default"].connection.query("SELECT matchuserscomments.comment_id,matchuserscomments.user, matchuserscomments.content,matchuserscomments.date, users.id,users.username,users.user_img,users.email  FROM matchuserscomments INNER JOIN users ON matchuserscomments.user = users.id WHERE matchuserscomments.comment_id = ?", [id], function (err, result) {
      res(result);
    });
  }
  /* db.connection.query('SELECT * from matchuserscomments WHERE id = ?', [id], (err, result) => {
          if (isNil(err) && !isEmpty(result)) { 
              db.connection.query('SELECT * from users WHERE id = ?', [result[0].user], (err, dbUser) => {
                  if (isNil(err) && !isEmpty(dbUser)) { 
                      res({comment: { ...result[0],  user: dbUser[0] }  })
                  } else {
                      rej(new Error(''))
                  }
              })
          }
          else {
              rej(new Error(''))
          }
      })
      */
  );
}; //SELECT * FROM `matchuserscomments` INNER JOIN users ON matchuserscomments.user = users.id


var _default = {
  addCommnet: addCommnet,
  editComment: editComment,
  getCommentById: getCommentById,
  getTeamsUsersComments: getTeamsUsersComments
};
exports["default"] = _default;