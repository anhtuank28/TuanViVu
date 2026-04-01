const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");


module.exports.login = async (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const {  email, password } = req.body;
  
  const exitsAccount=await AccountAdmin.findOne({
    email:email
  });

  if(!exitsAccount){
    res.json({
      code:"error",
      message:"Email Không tồn tại trong hệ thống"
    });
    return;
  }

  const isPasswordValid= await bcrypt.compare(password,exitsAccount.password);
  if(!isPasswordValid){
    req.json({
      code:"error",
      message:"Mật khẩu không đúng"
    });
    return ;
  }
  
  // if(exitsAccount.status !="active"){
  //   res.json({
  //     code:"error",
  //     message:"Tài khoản chưa được kích hoạt"
  //   });
  //   return ;
  // }

  //tạo JWT
  const token=jwt.sign(
    { 
      id: exitsAccount.id,
      email:exitsAccount.email
    },
    process.env.JWT_SECRET, //chuổi mã bảo mật
    {
      expiresIn:'1d' //token co thoi han 1 ngay
    } 
  )

  //lưu token vào cookie
  res.cookie("token",token,{
    maxAge:24*60*60*1000, //token co hieu luc trong 1 ngay
    httpOnly:true,
    sameSite:"strict"
  })


  res.json({
    code: "success",
    message: "Đăng nhập tài khoản thành công",
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
