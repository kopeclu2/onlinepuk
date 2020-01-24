"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _connectionDb = _interopRequireDefault(require("../_helpers/connectionDb"));

var _ramda = require("ramda");

var addAction = function addAction(_ref) {
  var body = _ref.body;
  var content = body.content,
      type = body.type,
      teamHomeOrHost = body.teamHomeOrHost,
      time = body.time,
      seconds = body.seconds,
      match_id = body.match_id;
  console.log(body);
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query('INSERT INTO matchactions(content,type,teamHomeOrHost,time,seconds,match_id) VALUES(?,?,?,?,?,?)', [content, type, teamHomeOrHost, time, seconds, match_id], function (err, result) {
      console.log(err);

      if (err) {
        rej(new Error(''));
      } else {
        res({
          message: 'Akce byla uspesne pridana'
        });
      }
    });
  });
};

var editAction = function editAction(_ref2) {
  var body = _ref2.body;
  var content = body.content,
      type = body.type,
      teamHomeOrHost = body.teamHomeOrHost,
      time = body.time,
      seconds = body.seconds,
      matchactions_id = body.matchactions_id;
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query('UPDATE matchactions SET content =? ,' + 'type = ?, teamHomeOrHost =?, time= ?, seconds = ? WHERE matchactions_id = ?', [content, type, teamHomeOrHost, time, seconds, matchactions_id], function (err, result) {
      console.log(err);

      if (err) {
        rej(new Error(''));
      } else {
        res({
          message: 'Akce byla uspesne aktualizovana'
        });
      }
    });
  });
};

var deleteAction = function deleteAction(_ref3) {
  var matchactions_id = _ref3.body.matchactions_id;
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query('DELETE FROM matchactions WHERE matchactions_id = ?', [matchactions_id], function (err, result) {
      console.log(err);

      if (err) {
        rej(new Error(''));
      } else {
        res({
          message: 'Akce byla uspesne smazana'
        });
      }
    });
  });
};

var getActionsOfMatchById = function getActionsOfMatchById(id) {
  return new Promise(function (res, rej) {
    _connectionDb["default"].connection.query('SELECT * from matchactions WHERE match_id = ? ', [id], function (err, result) {
      if (err) {
        rej(new Error(''));
      } else {
        res(result);
      }
    });
  });
};

var _default = {
  addAction: addAction,
  getActionsOfMatchById: getActionsOfMatchById,
  editAction: editAction,
  deleteAction: deleteAction
};
exports["default"] = _default;