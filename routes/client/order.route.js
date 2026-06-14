const router=require("express").Router();
const orderController=require("../../controllers/client/order.controller");


router.post("/create",orderController.createOrder)
router.get("/success",orderController.success)


module.exports=router;