"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function errorHandler(err, req, res, next) {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({
      message: err
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      message: 'Špatný ověřovací token, na tuto operaci nemáte dostatečná práva'
    });
  } // default to 500 server error


  return res.status(500).json({
    message: err.message
  });
}

var _default = errorHandler;
exports["default"] = _default;