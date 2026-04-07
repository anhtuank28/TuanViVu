module.exports.home = (req, res) => {
  res.render("client/pages/home.pug");
};

module.exports.termsOfService = (req, res) => {
  res.render("client/pages/terms-of-service.pug");
};

module.exports.privacyPolicy = (req, res) => {
  res.render("client/pages/privacy-policy.pug");
};
