var express = require('express');
var router = express.Router();
const reservasController = require("../controllers/reservasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');


/* GET home page. */
router.get('/', requiresAuth(),reservasController.index);
router.get('/crear',requiresAuth(),reservasController.crear);
router.post("/",requiresAuth(),reservasController.guardar);
router.post('/eliminar/:id', requiresAuth(),reservasController.eliminar);
router.get('/editar/:id',requiresAuth(), reservasController.editar);
router.post("/actualizar",requiresAuth(),
reservasController.actualizar);

module.exports = router;