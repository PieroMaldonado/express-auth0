var express = require('express');
var router = express.Router();
const productosController = require("../controllers/productosController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');


/* GET home page. */
router.get('/',requiresAuth(),productosController.index);
router.get('/crear',requiresAuth(),productosController.crear);
router.post("/",requiresAuth,
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],
productosController.guardar);
router.post('/eliminar/:id',requiresAuth(),productosController.eliminar);
router.get('/editar/:id',requiresAuth(),productosController.editar);
router.post("/actualizar",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),
productosController.actualizar);

module.exports = router;