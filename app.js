var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment'); 
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const session = require('express-session');
const { auth, requiresAuth } = require('express-openid-connect');
const indexController = require("./controllers/indexController");
var app = express();

const port = process.env.Port || 4000; // 
app.set('port', port);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: 'l79hsux4xgsipmwsisnxa7mu13c04hbrxjfe6ohvg3s6n3d4od2400031hx89tq1z1spq7xsc1epwfwlo74vfqgxqrh0xgpoujyn',
  baseURL: 'http://localhost:4000',
  clientID: 'oaochaXi3tMMVJfAxis92KwJRFEejpcp',
  issuerBaseURL: 'https://dev-0giiekio4xgysadj.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Ruta para la vista home del authRouter
app.get('/home', requiresAuth(), indexController.home);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mesasRouter = require('./routes/mesas');
var clientesRouter = require('./routes/clientes');
var productosRouter = require('./routes/productos');
var categoriasRouter = require('./routes/categorias');
var reservasRouter = require('./routes/reservas');
var pedidosRouter = require('./routes/pedidos');
var estadisticasRouter = require('./routes/estadisticas');

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extends: false}));
// Con esto tendremos disponible moment.js en toda la aplicación
app.locals.moment = require('moment'); 
app.use(flash());
// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge:  3600 * 1000 // 1hr
}));
app.use(session({
  secret: 'mykey',
  resave: false,
  saveUninitialized: false
}));

// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/mesas', mesasRouter);
app.use('/clientes', clientesRouter);
app.use('/productos', productosRouter);
app.use('/categorias', categoriasRouter);
app.use('/reservas', reservasRouter);
app.use('/pedidos', pedidosRouter);
app.use('/estadisticas', estadisticasRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
