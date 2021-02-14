"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deletePeliculaById = exports.editPelicula = exports.addPelicula = exports.getPeliculaById = exports.getPeliculas = void 0;

var _database = _interopRequireDefault(require("../database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getPeliculas = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var peliculas;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _database["default"].query('SELECT * FROM peliculas');

          case 2:
            peliculas = _context.sent;
            res.json(peliculas);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPeliculas(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPeliculas = getPeliculas;

var getPeliculaById = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, pelicula;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.next = 3;
            return _database["default"].query('SELECT * FROM peliculas WHERE id = ?', [id]);

          case 3:
            pelicula = _context2.sent;

            if (!(pelicula.length > 0)) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.json(pelicula));

          case 6:
            res.status(404).json({
              message: "La pelicula no se encuentra en la base datos"
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getPeliculaById(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getPeliculaById = getPeliculaById;

var addPelicula = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, nombre, descripcion, categoria, url, urlfondo, urldescarga, newPelicula;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$body = req.body, nombre = _req$body.nombre, descripcion = _req$body.descripcion, categoria = _req$body.categoria, url = _req$body.url, urlfondo = _req$body.urlfondo, urldescarga = _req$body.urldescarga;
            newPelicula = {
              nombre: nombre,
              descripcion: descripcion,
              categoria: categoria,
              url: url,
              urlfondo: urlfondo,
              urldescarga: urldescarga
            };
            _context3.next = 4;
            return _database["default"].query('INSERT INTO peliculas set ?', [newPelicula]);

          case 4:
            res.status(201).json(newPelicula);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function addPelicula(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.addPelicula = addPelicula;

var editPelicula = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _req$body2, nombre, descripcion, categoria, url, urlfondo, urldescarga, updatePelicula;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _req$body2 = req.body, nombre = _req$body2.nombre, descripcion = _req$body2.descripcion, categoria = _req$body2.categoria, url = _req$body2.url, urlfondo = _req$body2.urlfondo, urldescarga = _req$body2.urldescarga;
            updatePelicula = {
              nombre: nombre,
              descripcion: descripcion,
              categoria: categoria,
              url: url,
              urlfondo: urlfondo,
              urldescarga: urldescarga
            };
            _context4.next = 5;
            return _database["default"].query('UPDATE peliculas set ? WHERE id = ?', [updatePelicula, id]);

          case 5:
            res.status(204).json();

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function editPelicula(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.editPelicula = editPelicula;

var deletePeliculaById = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.next = 3;
            return _database["default"].query('DELETE FROM peliculas WHERE id = ? ', [id]);

          case 3:
            res.status(204).json();

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function deletePeliculaById(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.deletePeliculaById = deletePeliculaById;