"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mysql = _interopRequireDefault(require("mysql"));

var _keys = require("./keys");

var _util = require("util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pool = _mysql["default"].createPool(_keys.database);

pool.getConnection(function (err, connection) {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('la conexion a la base de datos fue cerrada');
    }

    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('La base de datos tiene varias conexiones');
    }

    if (err.code === 'ENCONNREFUSED') {
      console.error('La conexion a la base de datos fue rechazada');
    }
  }

  if (connection) connection.release();
  console.log('DB conectada');
  return;
});
pool.query = (0, _util.promisify)(pool.query);
var _default = pool;
exports["default"] = _default;