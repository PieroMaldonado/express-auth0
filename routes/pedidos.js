const express = require('express');
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado

/* GET home page. */
router.get('/:id', requiresAuth(),requireRole('admin'),pedidosController.index);
router.get('/crear/:id',requiresAuth(),requireRole('admin'),pedidosController.crear);
router.post("/:id",requiresAuth(),requireRole('admin'),
pedidosController.guardar);
router.post('/eliminar/:id',requiresAuth(),requireRole('admin'),pedidosController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'),pedidosController.editar);
router.post("/actualizar",
[
    body('reservaID')
    .notEmpty()
    .withMessage('Debe ingresar una reserva')
],requiresAuth(),requireRole('admin'),
pedidosController.actualizar);

module.exports = router;