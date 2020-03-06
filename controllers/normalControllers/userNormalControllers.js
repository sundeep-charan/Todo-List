module.exports = {
  renderRegisterPage: function(req, res) {
    res.render("register", {
      title: "Register page"
    });
  },

  renderLoginPage: function(req, res) {
    res.render("login", {
      title: "Login page"
    });
  }
};
