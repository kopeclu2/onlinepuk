"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisePool = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

var connection = _mysql["default"].createPool({
  host: 'md37.wedos.net',
  user: 'a212313_puk',
  password: 'Monstercar494@',
  database: 'd212313_puk'
});

var promisePool = connection.promise();
exports.promisePool = promisePool;