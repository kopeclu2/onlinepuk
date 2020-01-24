"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisePool = void 0;

var _mysql = _interopRequireDefault(require("mysql2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connection = _mysql["default"].createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlinepuk'
});

var promisePool = connection.promise();
exports.promisePool = promisePool;