var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const { requiresAuth } = require('express-openid-connect');
const {body} = require('express-validator');
const requireRole = require('../middleware/requireRole'); // Importa el middleware de autorización personalizado

// GET home page
router.get('/', (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        return res.redirect('/home');
    }
    next();
}, indexController.index);

// Route for login
router.get('/login', requiresAuth(), indexController.login);

router.post("/",
[
    body('cedula')
    .notEmpty()
    .withMessage('Debe ingresar una cédula')
],requiresAuth(),requireRole('admin'),
indexController.encryptData);

module.exports = router;
