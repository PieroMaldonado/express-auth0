var express = require('express');
var router = express.Router();
const pedidosController = require("../controllers/pedidosController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación

/* GET home page. */
router.get('/:id', requireAuth,pedidosController.index);
router.get('/crear/:id',requireAuth,pedidosController.crear);
router.post("/:id",requireAuth,
// [
//     body('fecha')
//     .notEmpty()
//     .withMessage('Debe ingresar una fecha')
// ],
pedidosController.guardar);
router.post('/eliminar/:id',requireAuth,pedidosController.eliminar);
router.get('/editar/:id',requireAuth,pedidosController.editar);
router.post("/actualizar",
[
    body('reservaID')
    .notEmpty()
    .withMessage('Debe ingresar una reserva')
],requireAuth,
pedidosController.actualizar);

module.exports = router;