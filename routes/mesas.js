var express = require('express');
var router = express.Router();
const mesasController = require("../controllers/mesasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get('/', requiresAuth(),mesasController.index);
router.get('/crear', requiresAuth(),mesasController.crear);
router.post("/",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requiresAuth(),
mesasController.guardar);
router.post('/eliminar/:id',requiresAuth(),mesasController.eliminar);
router.get('/editar/:id',requiresAuth(),mesasController.editar);
router.post("/actualizar",
[
    body('numeroMesa')
    .notEmpty()
    .withMessage('Debe ingresar un número')
],requiresAuth(),
mesasController.actualizar);

module.exports = router;