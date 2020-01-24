"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connection = _mysql["default"].createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlinepuk'
});

var connect = function connect() {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
};

var connect2 = function connect2() {};

var _default = {
  connect: connect,
  connection: connection
};
exports["default"] = _default;