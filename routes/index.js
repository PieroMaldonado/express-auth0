var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController");
const { requiresAuth } = require('express-openid-connect');

// GET home page
router.get('/', (req, res, next) => {
    if (req.oidc.isAuthenticated()) {
        return res.redirect('/home');
    }
    next();
}, indexController.index);

// Route for login
router.get('/login', requiresAuth(), indexController.login);

module.exports = router;
