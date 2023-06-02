var express = require('express');
var router = express.Router();
const mesasController = require("../controllers/mesasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado


/* GET home page. */
router.get('/', requiresAuth(),mesasController.index);
router.get('/crear', requiresAuth(),requireRole('admin'),mesasController.crear);
router.post("/",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requiresAuth(),requireRole('admin'),
mesasController.guardar);
router.post('/eliminar/:id',requiresAuth(),requireRole('admin'),mesasController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'),mesasController.editar);
router.post("/actualizar",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requiresAuth(),requireRole('admin'),
mesasController.actualizar);

module.exports = router;