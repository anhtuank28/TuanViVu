const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");

module.exports.login = async (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Đăng nhập",
  });
};
module.exports.register = async (req, res) => {
  res.render("admin/pages/register", {
    pageTitle: "Đăng ký",
  });
};
module.exports.registerPost = async (req, res) => {
  const { fullName, email, password } = req.body;
  const exitsAccount = await AccountAdmin.findOne({
    email: email,
  });
  if (exitsAccount) {
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống",
    });
    return;
  }

  //mã hoá mật khẩu với bcrypt
  const salt = await bcrypt.genSalt(10); //tạo ra chuỗi ngẫu nhiên có 10 ký tự
  const hashPassword = await bcrypt.hash(password, salt);

  const newAccount = new AccountAdmin({
    fullName: fullName,
    email: email,
    password: hashPassword,
    status: "initial",
  });

  await newAccount.save();

  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công",
  });
};

module.exports.registerInitial = async (req, res) => {
  res.render("admin/pages/register-initial", {
    pageTitle: "Tài khoản đã được khởi tạo",
  });
};

module.exports.forgotPassword = async (req, res) => {
  res.render("admin/pages/forgot-password", {
    pageTitle: "Quên mật khẩu",
  });
};
module.exports.otpPassword = async (req, res) => {
  res.render("admin/pages/otp-password", {
    pageTitle: "Mã OTP",
  });
};
module.exports.resetPassword = async (req, res) => {
  res.render("admin/pages/reset-password", {
    pageTitle: "đổi mật khẩu",
  });
};
