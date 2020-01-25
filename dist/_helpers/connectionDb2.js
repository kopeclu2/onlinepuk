"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisePool = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var connection = _mysql["default"].createPool({
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bf6d58fc3eb263',
  password: 'baf1a3a1',
  database: 'heroku_830860e9211f00b'
});

var promisePool = connection.promise();
exports.promisePool = promisePool;