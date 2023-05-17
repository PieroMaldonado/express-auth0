var express = require('express');
var router = express.Router();
const estadisticasController = require("../controllers/estadisticasController");
const {body} = require('express-validator');
const requireAuth = require('../middleware/authMiddleware'); // Middleware de autenticación


/* GET home page. */
router.get('/',requireAuth, estadisticasController.index);

router.post("/",requireAuth,estadisticasController.index);

module.exports = router;