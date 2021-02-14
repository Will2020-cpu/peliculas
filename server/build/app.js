"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _package = _interopRequireDefault(require("../package.json"));

var _helmet = _interopRequireDefault(require("helmet"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _peliculas = _interopRequireDefault(require("./routes/peliculas.routes"));

var _auth = _interopRequireDefault(require("./routes/auth.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//Importando rutas
var app = (0, _express["default"])(); //Configuraciones

app.set('port', process.env.PORT || 5000);
app.set('informacion', _package["default"]);
app.use((0, _helmet["default"])());
app.use((0, _morgan["default"])('dev'));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.get('/', function (req, res) {
  res.json({
    author: app.set('informacion').author,
    description: app.set('informacion').description
  });
});
app.use('/api/peliculas', _peliculas["default"]);
app.use('/api/auth', _auth["default"]);
var _default = app;
exports["default"] = _default;