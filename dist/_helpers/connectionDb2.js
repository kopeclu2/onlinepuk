"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisePool = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var _connectionDb = require("./connectionDb.js");

var connection = _mysql["default"].createPool({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bb0fcff5eb8769',
  password: '3109bf24',
  database: 'heroku_6b93634abffb7e6'
});

var promisePool = connection.promise();
exports.promisePool = promisePool;