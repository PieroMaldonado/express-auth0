var express = require('express');
var router = express.Router();
const reservasController = require("../controllers/reservasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado


/* GET home page. */
router.get('/', requiresAuth(),reservasController.index);
router.get('/crear',requiresAuth(),requireRole('admin'),reservasController.crear);
router.post("/",requiresAuth(),requireRole('admin'),reservasController.guardar);
router.post('/eliminar/:id', requiresAuth(),requireRole('admin'),reservasController.eliminar);
router.get('/editar/:id',requiresAuth(),requireRole('admin'), reservasController.editar);
router.post("/actualizar",requiresAuth(),requireRole('admin'),
reservasController.actualizar);

module.exports = router;