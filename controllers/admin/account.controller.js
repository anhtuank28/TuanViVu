const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const generateHelper=require("../../helpers/generate.helper");
const forgotPassword = require('../../models/forgot-password.model');

const mailHelper=require("../../helpers/mail.helper");

module.exports.login = async (req, res) => {
  res.render("admin/pages/login", {
    pageTitle: "Đăng nhập",
  });
};

module.exports.loginPost = async (req, res) => {
  const {  email, password,rememberPassword } = req.body;
  
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
    res.json({
      code:"error",
      message:"Mật khẩu không đúng"
    });
    return ;
  }
  
  if(exitsAccount.status !="active"){
    res.json({
      code:"error",
      message:"Tài khoản chưa được kích hoạt"
    });
    return ;
  }

  //tạo JWT
  const token=jwt.sign(
    { 
      id: exitsAccount.id,
      email:exitsAccount.email
    },
    process.env.JWT_SECRET, //chuổi mã bảo mật
    {
      expiresIn: rememberPassword ? '30d' : '1d' //token co thoi han 1 ngay
    } 
  )

  //lưu token vào cookie
  res.cookie("token",token,{
    maxAge: rememberPassword ? (30*24*60*60*1000) :  (24*60*60*1000), //token co hieu luc trong 1 ngay
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

module.exports.forgotPasswordPost= async (req, res) => {
  const {email}=req.body;
  console.log(email);

  //kiểm tra xem email có tồn tại trong hệ thống không
const exitsAccount= await AccountAdmin.findOne({
  email:email

})
if(!exitsAccount){
  res.json({
    code:"error",
    message:"Email không tồn tại trong hệ thống"
  })
  return ;
}

  //kiểm tra email đã tồn tại trong forgetPassword chưa
  const exitsEmailInForgotPassword=await forgotPassword.findOne({
    email:email
  })
  if(exitsEmailInForgotPassword){
    res.json({
    code:"error",
    message:"Vui lòng gửi lại yêu cầu sau 5p"
  })
  return ;
  }

  //tạo mã OTP
  const otp=generateHelper.generateRandomNumber(6);
  console.log(otp);

  //lưu vào database: email, otp sau 5p sẽ tự động xoá bản ghi
  const newRecord= new forgotPassword({
    email:email,
    otp:otp,
    expireAt: Date.now()+5*60*1000
  })
  await newRecord.save();

  //gửi mã OTP qua email cho người dùng tự động
  const subject="Mã OTP lấy lại mật khẩu";
  const content=`Mã OTP của bạn là <b style="color: green;">${otp}</b>.
   Mã OTP có hiệu lực trong 5 phút, 
   vui lòng không cung cấp cho bất kỳ ai`;
  mailHelper.sendMail(email,subject,content);

  res.json({
    code:"success",
    message:"Đã gửi mã OTP qua email"
  })
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

module.exports.otpPasswordPost = async (req, res) => {
  const {otp,email}=req.body;

  //kiểm tra có tông tại bản ghi trong forgotPassword
  const existRecord = await forgotPassword.findOne({
    otp:otp,
    email:email
  }
  )

  if(!existRecord){
    res.json({
      code:"error",
      message:'Mã OTP không chính xác'
    })
    return;
  }
  //Tìm thông tin của user trong Account Admin
  const account=await AccountAdmin.findOne({
    email:email
  })
  //Tạo JWT
  const token=jwt.sign(
    { 
      id: account.id,
      email:account.email
    },
    process.env.JWT_SECRET, //chuổi mã bảo mật
    {
      expiresIn:  '1d' //token co thoi han 1 ngay
    } 
  )

  //lưu token vào cookie
  res.cookie("token",token,{
    maxAge: 24*60*60*1000, //token co hieu luc trong 1 ngay
    httpOnly:true,
    sameSite:"strict"
  })


  res.json({
    code:"success",
    message:"Xác thực OTP thành công"
  })
};

module.exports.resetPassword = async (req, res) => {
  res.render("admin/pages/reset-password", {
    pageTitle: "đổi mật khẩu",
  });
};

module.exports.resetPasswordPost = async (req, res) => {
  const {password}=req.body;

  const salt = await bcrypt.genSalt(10);
  const hashPassword=await bcrypt.hash(password,salt);

  await AccountAdmin.updateOne({
    _id: req.account.id
  },{
    password:hashPassword
  })

  res.json({
    code:"success",
    message:"Đổi mật khẩu thành công"
  })

};

module.exports.logoutPost=async(req,res)=>{
  res.clearCookie("token");
  res.json({
    code:"success",
    message:"Đăng xuất thành công"
  })
}