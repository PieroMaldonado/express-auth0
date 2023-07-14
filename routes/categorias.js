const express = require('express');
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado


/* GET home page. */
router.get('/',requiresAuth(), categoriasController.index);
router.get('/crear',requiresAuth(),requireRole('admin'),categoriasController.crear);
router.post("/",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),requireRole('admin'),
categoriasController.guardar);
router.post('/eliminar/:id',requiresAuth(),requireRole('admin'), categoriasController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'), categoriasController.editar);
router.post("/actualizar",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),requireRole('admin'),
categoriasController.actualizar);

module.exports = router;