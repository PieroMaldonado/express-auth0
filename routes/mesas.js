var express = require('express');
var router = express.Router();
const mesasController = require("../controllers/mesasController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación

/* GET home page. */
router.get('/', requireAuth,mesasController.index);
router.get('/crear', requireAuth,mesasController.crear);
router.post("/",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requireAuth,
mesasController.guardar);
router.post('/eliminar/:id',requireAuth,mesasController.eliminar);
router.get('/editar/:id',requireAuth,mesasController.editar);
router.post("/actualizar",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requireAuth,
mesasController.actualizar);

module.exports = router;