const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

module.exports.userInfo = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    try {
      const decoded = jwt.verify(req.cookies.tokenUser, process.env.JWT_SECRET);
      const user = await User.findOne({
        _id: decoded.id,
        deleted: false,
        status: "active"
      }).select("-password");

      if (user) {
        res.locals.user = user;
      }
    } catch (error) {
      // Invalid token, do nothing
    }
  }
  next();
};

module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect("/auth/login");
    return;
  }

  try {
    const decoded = jwt.verify(req.cookies.tokenUser, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      deleted: false,
      status: "active"
    });

    if (!user) {
      res.clearCookie("tokenUser");
      res.redirect("/auth/login");
      return;
    }

    req.user = user; // Attach for the next handlers
    next();
  } catch (error) {
    res.clearCookie("tokenUser");
    res.redirect("/auth/login");
  }
};
