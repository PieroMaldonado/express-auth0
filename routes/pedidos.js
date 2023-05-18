var express = require('express');
var router = express.Router();
const pedidosController = require("../controllers/pedidosController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get('/:id', requiresAuth(),pedidosController.index);
router.get('/crear/:id',requiresAuth(),pedidosController.crear);
router.post("/:id",requiresAuth(),
// [
//     body('fecha')
//     .notEmpty()
//     .withMessage('Debe ingresar una fecha')
// ],
pedidosController.guardar);
router.post('/eliminar/:id',requiresAuth(),pedidosController.eliminar);
router.get('/editar/:id',requiresAuth(),pedidosController.editar);
router.post("/actualizar",
[
    body('reservaID')
    .notEmpty()
    .withMessage('Debe ingresar una reserva')
],requiresAuth(),
pedidosController.actualizar);

module.exports = router;