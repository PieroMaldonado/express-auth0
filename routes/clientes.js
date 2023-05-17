var express = require('express');
var router = express.Router();
const clientesController = require("../controllers/clientesController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación

/* GET home page. */
router.get('/',requireAuth, clientesController.index);
router.get('/crear',requireAuth,clientesController.crear);
router.post("/",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requireAuth,
clientesController.guardar);
router.post('/eliminar/:id',requireAuth, clientesController.eliminar);
router.get('/editar/:id',requireAuth, clientesController.editar);
router.post("/actualizar",requireAuth,
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requireAuth,
clientesController.actualizar);

module.exports = router;