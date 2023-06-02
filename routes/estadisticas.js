var express = require('express');
var router = express.Router();
const estadisticasController = require("../controllers/estadisticasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado

/* GET home page. */
router.get('/',requiresAuth(),requireRole('admin'), estadisticasController.index);

router.post("/",requiresAuth(),requireRole('admin'),estadisticasController.index);

module.exports = router;