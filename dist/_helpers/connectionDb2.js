"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisePool = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var _connectionDb = require("./connectionDb.js");

var connection = _mysql["default"].createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlinepuk'
});

var promisePool = connection.promise();
exports.promisePool = promisePool;