var express = require('express');
var router = express.Router();
const reservasController = require("../controllers/reservasController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación


/* GET home page. */
router.get('/', requireAuth,reservasController.index);
router.get('/crear',requireAuth,reservasController.crear);
router.post("/",requireAuth,reservasController.guardar);
router.post('/eliminar/:id',requireAuth,reservasController.eliminar);
router.get('/editar/:id',requireAuth, reservasController.editar);
router.post("/actualizar",requireAuth,
reservasController.actualizar);

module.exports = router;