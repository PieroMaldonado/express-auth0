var express = require('express');
var router = express.Router();
const productosController = require("../controllers/productosController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación


/* GET home page. */
router.get('/',requireAuth,productosController.index);
router.get('/crear',requireAuth,productosController.crear);
router.post("/",requireAuth,
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],
productosController.guardar);
router.post('/eliminar/:id',requireAuth,productosController.eliminar);
router.get('/editar/:id',requireAuth,productosController.editar);
router.post("/actualizar",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requireAuth,
productosController.actualizar);

module.exports = router;