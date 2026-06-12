const router = require("express").Router();
const tourRoutes = require("./tour.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");
const contactRouters=require("./contact.route");
const categoryRouters=require("./category.route");
const searchRouters=require("./search.route");


const settingMiddleWare=require("../../middlewares/client/setting.middleware");
const categoryMiddleWare=require("../../middlewares/client/category.middleware");

router.use(settingMiddleWare.websiteInfo)
router.use(categoryMiddleWare.list)
router.use("/", homeRoutes);

router.use("/tour", tourRoutes);
router.use("/cart", cartRoutes);
router.use("/cart", cartRoutes);
router.use("/contact", contactRouters);
router.use("/category", categoryRouters);
router.use("/search", searchRouters);


module.exports = router;
