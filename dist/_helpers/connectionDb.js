"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conectionObj = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _herokuLogger = _interopRequireDefault(require("heroku-logger"));

var prodConnection = {
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bb0fcff5eb8769',
  password: '3109bf24',
  database: 'heroku_6b93634abffb7e6'
};
var localConnection = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlinepuk'
};
var herokuOnlinePuk2 = {
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bb0fcff5eb8769',
  password: '3109bf24',
  database: 'heroku_6b93634abffb7e6'
};
var conectionObj = process.env.NODE_ENV === 'production' ? prodConnection : localConnection;
exports.conectionObj = conectionObj;

var connection = _mysql["default"].createConnection(localConnection);

var connect = function connect() {
  connection = _mysql["default"].createConnection(localConnection);
  connection.connect(function (err) {
    if (err) {
      _herokuLogger["default"].error('error connecting: ' + err.stack);

      setTimeout(function () {
        connect();
      }, 2000);
      return;
    }

    connection.on('error', function () {
      _herokuLogger["default"].error('ERROR databse mySQL closed');

      connection.end();
      connect();
    });

    _herokuLogger["default"].info('MYSQL 1 connected as id ' + connection.threadId);
  });
};

var _default = {
  connect: connect,
  connection: connection
};
exports["default"] = _default;