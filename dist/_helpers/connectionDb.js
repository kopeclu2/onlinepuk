"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var connection = _mysql["default"].createConnection({
  host: 'md37.wedos.net',
  user: 'a212313_puk',
  password: 'Monstercar494@',
  database: 'd212313_puk'
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