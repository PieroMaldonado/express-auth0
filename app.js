const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const moment = require('moment'); 
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const session = require('express-session');
const { auth, requiresAuth } = require('express-openid-connect');
const indexController = require("./controllers/indexController");
let app = express();
app.disable("x-powered-by");

const port = process.env.Port || 4000; // 
app.set('port', port);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.secret,
  baseURL: process.env.baseURL,
  clientID: process.env.clientID,
  issuerBaseURL: process.env.issuerBaseURL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// Ruta para la vista home del authRouter
app.get('/home', requiresAuth(), indexController.home);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mesasRouter = require('./routes/mesas');
const clientesRouter = require('./routes/clientes');
const productosRouter = require('./routes/productos');
const categoriasRouter = require('./routes/categorias');
const reservasRouter = require('./routes/reservas');
const pedidosRouter = require('./routes/pedidos');
const estadisticasRouter = require('./routes/estadisticas');

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

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
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
