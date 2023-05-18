var express = require('express');
var router = express.Router();
const categoriasController = require("../controllers/categoriasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');


/* GET home page. */
router.get('/',requiresAuth(), categoriasController.index);
router.get('/crear',requiresAuth(),categoriasController.crear);
router.post("/",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),
categoriasController.guardar);
router.post('/eliminar/:id',requiresAuth(), categoriasController.eliminar);
router.get('/editar/:id',requiresAuth(), categoriasController.editar);
router.post("/actualizar",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),
categoriasController.actualizar);

module.exports = router;