const moongose = require("mongoose");
const schema= new moongose.Schema(
    {
        email:String,
        deleted:{
            type:Boolean,
            default:false
        },
        deletedBy:String,
        deletedAt:Date
    },{
        timestamps:true
    }
)

const Contact=moongose.model("contact",schema,"contacts");
module.exports=Contact;