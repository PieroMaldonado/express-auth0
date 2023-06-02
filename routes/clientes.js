var express = require('express');
var router = express.Router();
const clientesController = require("../controllers/clientesController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado

/* GET home page. */
router.get('/',requiresAuth(),requireRole('admin'), clientesController.index);
router.get('/crear',requiresAuth(),requireRole('admin'),clientesController.crear);
router.post("/",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),requireRole('admin'),
clientesController.guardar);
router.post('/eliminar/:id',requiresAuth(),requireRole('admin'), clientesController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'), clientesController.editar);
router.post("/actualizar",requiresAuth(),requireRole('admin'),
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),requireRole('admin'),
clientesController.actualizar);

module.exports = router;