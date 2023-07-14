const express = require('express');
const router = express.Router();
const productosController = require("../controllers/productosController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado


/* GET home page. */
router.get('/',requiresAuth(),productosController.index);
router.get('/crear',requiresAuth(),requireRole('admin'),productosController.crear);
router.post("/",requiresAuth(),requireRole('admin'),
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],
productosController.guardar);
router.post('/eliminar/:id',requiresAuth(),requireRole('admin'),productosController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'),productosController.editar);
router.post("/actualizar",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),requireRole('admin'),
productosController.actualizar);

module.exports = router;