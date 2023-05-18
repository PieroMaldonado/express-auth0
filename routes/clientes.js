var express = require('express');
var router = express.Router();
const clientesController = require("../controllers/clientesController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');

/* GET home page. */
router.get('/',requiresAuth(), clientesController.index);
router.get('/crear',requiresAuth(),clientesController.crear);
router.post("/",
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),
clientesController.guardar);
router.post('/eliminar/:id',requiresAuth(), clientesController.eliminar);
router.get('/editar/:id',requiresAuth(), clientesController.editar);
router.post("/actualizar",requiresAuth(),
[
    body('nombre')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requiresAuth(),
clientesController.actualizar);

module.exports = router;