"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyRol = exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _database = _interopRequireDefault(require("../database"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var verifyToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var token, pase, comprobando;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.headers['x-access-token'];

            if (token) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.status(403).json({
              error: "No hay token no pasaras por aqui :("
            }));

          case 3:
            _context.prev = 3;
            pase = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            req.user = pase.email;
            _context.next = 8;
            return _database["default"].query('SELECT * FROM users WHERE email = ? AND password = ?', [pase.email, pase.password]);

          case 8:
            comprobando = _context.sent;

            if (!(comprobando.length < 0)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.json({
              error: "Este usuario no existe en la base de datos"
            }));

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", res.status(403).json({
              message: "Este token es invalido"
            }));

          case 16:
            next();

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 13]]);
  }));

  return function verifyToken(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.verifyToken = verifyToken;

var verifyRol = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var row;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _database["default"].query('SELECT * FROM users WHERE email = ?', [req.user]);

          case 2:
            row = _context2.sent;

            if (!(row.length > 0)) {
              _context2.next = 8;
              break;
            }

            if (!(row[0].rol === 'normal')) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(403).json({
              error: "forbidden"
            }));

          case 6:
            _context2.next = 9;
            break;

          case 8:
            return _context2.abrupt("return", res.status(403).json({
              error: "nice try"
            }));

          case 9:
            next();

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function verifyRol(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.verifyRol = verifyRol;