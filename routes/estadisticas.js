var express = require('express');
var router = express.Router();
const estadisticasController = require("../controllers/estadisticasController");
const {body} = require('express-validator');
const { requiresAuth } = require('express-openid-connect');


/* GET home page. */
router.get('/',requiresAuth(), estadisticasController.index);

router.post("/",requiresAuth(),estadisticasController.index);

module.exports = router;