function requireAuth(req, res, next) {
    if (!req.oidc.isAuthenticated()) {
      return res.redirect('/login');
    }
    next();
  }
  
  module.exports = requireAuth;
  