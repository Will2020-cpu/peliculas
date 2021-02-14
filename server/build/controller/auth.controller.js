"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whoami = exports.signupAdmin = exports.signup = exports.signin = void 0;

var _database = _interopRequireDefault(require("../database"));

var _encrypt = _interopRequireDefault(require("../libs/encrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var signin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, email, password, comprabando, user, validPassword, token;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, email = _req$body.email, password = _req$body.password;
            _context.next = 3;
            return _database["default"].query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

          case 3:
            comprabando = _context.sent;

            if (!(comprabando.length > 0)) {
              _context.next = 15;
              break;
            }

            user = comprabando[0];
            _context.next = 8;
            return _encrypt["default"].matchPassword(password, user.password);

          case 8:
            validPassword = _context.sent;

            if (!validPassword) {
              _context.next = 14;
              break;
            }

            token = _jsonwebtoken["default"].sign({
              email: email,
              password: password
            }, _config["default"].SECRET);
            return _context.abrupt("return", res.status(200).json({
              token: token
            }));

          case 14:
            return _context.abrupt("return", res.status(404).json({
              error: "Contraseña incorrecta"
            }));

          case 15:
            res.status(404).json({
              error: "El email no esta registrado"
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = signin;

var signup = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, nombre, email, password, comprabando, passwordEncrypt, newUser, token;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, nombre = _req$body2.nombre, email = _req$body2.email, password = _req$body2.password;
            _context2.next = 3;
            return _database["default"].query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

          case 3:
            comprabando = _context2.sent;

            if (!(comprabando.length > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json({
              error: "El email ya se encuentra registrado"
            }));

          case 6:
            _context2.next = 8;
            return _encrypt["default"].encryptPassword(password);

          case 8:
            passwordEncrypt = _context2.sent;
            newUser = {
              nombre: nombre,
              email: email.toLowerCase(),
              password: passwordEncrypt,
              rol: 'normal'
            };
            token = _jsonwebtoken["default"].sign({
              email: newUser.email,
              password: passwordEncrypt
            }, _config["default"].SECRET);
            _context2.next = 13;
            return _database["default"].query('INSERT INTO users set ?', [newUser]);

          case 13:
            res.json({
              token: token
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function signup(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signup = signup;

var signupAdmin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body3, nombre, email, password, clave, comprabando, passwordEncrypt, newAdmin, token;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body3 = req.body, nombre = _req$body3.nombre, email = _req$body3.email, password = _req$body3.password, clave = _req$body3.clave;

            if (!(clave === undefined)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(404).json({
              error: "Necesitas la clave secreta para poder agregar otro administrador"
            }));

          case 3:
            if (!(clave === _config["default"].CLAVE)) {
              _context3.next = 17;
              break;
            }

            _context3.next = 6;
            return _database["default"].query('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);

          case 6:
            comprabando = _context3.sent;

            if (!(comprabando.length > 0)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", res.json({
              error: "El email ya se encuentra registrado"
            }));

          case 9:
            _context3.next = 11;
            return _encrypt["default"].encryptPassword(password);

          case 11:
            passwordEncrypt = _context3.sent;
            newAdmin = {
              nombre: nombre,
              email: email.toLowerCase(),
              password: passwordEncrypt,
              rol: 'admin'
            };
            token = _jsonwebtoken["default"].sign({
              email: newAdmin.email,
              pasword: newAdmin.pasword
            }, _config["default"].SECRET);
            _context3.next = 16;
            return _database["default"].query('INSERT INTO users set ? ', [newAdmin]);

          case 16:
            return _context3.abrupt("return", res.status(200).json({
              token: token
            }));

          case 17:
            res.status(404).json({
              error: "La clave es incorrecta"
            });

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function signupAdmin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.signupAdmin = signupAdmin;

var whoami = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var token, verify, comprabando, datos;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = req.headers["x-access-token"];

            if (token) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              error: "No hay token no puedes entrar"
            }));

          case 3:
            _context4.prev = 3;
            verify = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
            _context4.next = 7;
            return _database["default"].query('SELECT * FROM users WHERE email = ?', [verify.email]);

          case 7:
            comprabando = _context4.sent;

            if (!(comprabando.length > 0)) {
              _context4.next = 11;
              break;
            }

            datos = {
              id: comprabando[0].id,
              nombre: comprabando[0].nombre,
              email: comprabando[0].email,
              rol: comprabando[0].rol
            };
            return _context4.abrupt("return", res.status(200).json(datos));

          case 11:
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](3);
            res.status(401).json({
              error: "Token invalido"
            });

          case 16:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[3, 13]]);
  }));

  return function whoami(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.whoami = whoami;