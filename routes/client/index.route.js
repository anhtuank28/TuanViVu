const router = require("express").Router();
const tourRoutes = require("./tour.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");

const settingMiddleWare=require("../../middlewares/client/setting.middleware");


router.use(settingMiddleWare.websiteInfo)

router.use("/tours", tourRoutes);
router.use("/", homeRoutes);
router.use("/cart", cartRoutes);


module.exports = router;
