const jwt=require("jsonwebtoken");
const AccountAdmin = require('../../models/account-admin.model');

module.exports.verityToken= async (req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            res.redirect(`/${pathAdmin}/account/login`);
            return;
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const {id,email}=decoded;

        const exitsAccount=await AccountAdmin.findOne({
            _id:id,
            email:email,
            status:"active"
        } )
        if(!exitsAccount){
            res.clearCookie("token");
            res.redirect(`/${pathAdmin}/account/login`);
            return;
        }

        req.account=exitsAccount;//Để gắn nick mà đang tìm được trong db vào thuộc tính account và gửi req lên controller
        res.locals.account=exitsAccount;//để trong các file pug có thể dùng được exitsAccount
            
        
        next();
    }catch(error){
        res.clearCookie("token");
        res.redirect(`/${pathAdmin}/account/login`);
    }
}