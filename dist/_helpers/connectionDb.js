"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conectionObj = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var prodConnection = {
  host: 'eu-cdbr-west-02.cleardb.net',
  user: 'bf6d58fc3eb263',
  password: 'baf1a3a1',
  database: 'heroku_830860e9211f00b'
};
var localConnection = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'onlinepuk'
};
var conectionObj = process.env.NODE_ENV === 'production' ? prodConnection : localConnection;
exports.conectionObj = conectionObj;

var connection = _mysql["default"].createConnection(localConnection);

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