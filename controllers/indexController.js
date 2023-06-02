module.exports = {
  index: function (req, res) {
    res.render('index',{ req: req });
  },
  login: function (req, res) {
    res.oidc.login({
      returnTo: '/home'
    });
  },
  home: function (req, res) {
    res.render('home', { req: req, user: req.oidc.user });
  }  
};
