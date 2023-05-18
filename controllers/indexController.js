module.exports = {
  index: function (req, res) {
    res.render('index');
  },
  login: function (req, res) {
    res.oidc.login({
      returnTo: '/home'
    });
  },
  home: function (req, res) {
    res.render('home', { user: req.oidc.user });
  }
};
