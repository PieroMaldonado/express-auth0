var express = require('express');
var router = express.Router();
const categoriasController = require("../controllers/categoriasController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación


/* GET home page. */
router.get('/',requireAuth, categoriasController.index);
router.get('/crear',requireAuth,categoriasController.crear);
router.post("/",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requireAuth,
categoriasController.guardar);
router.post('/eliminar/:id',requireAuth, categoriasController.eliminar);
router.get('/editar/:id',requireAuth, categoriasController.editar);
router.post("/actualizar",
[
    body('categoria')
    .notEmpty()
    .withMessage('Debe ingresar un nombre')
],requireAuth,
categoriasController.actualizar);

module.exports = router;