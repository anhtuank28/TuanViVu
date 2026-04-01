const router = require("express").Router();
const accountRoutes = require("./account.route");
const dashboardRoutes = require("./dashboard.route");
const categoryRoutes = require("./category.route");
const tourRoutes = require("./tour.route");
const orderRoutes = require("./order.route");
const userRoutes = require("./user.route");
const contactRoutes = require("./contact.route");
const settingRoutes = require("./setting.route");
const profileRoutes = require("./profile.route");

const authMiddleware=require("../../middlewares/admin/auth.middleware");



router.use("/account", accountRoutes);
router.use("/dashboard",authMiddleware.verityToken ,dashboardRoutes);
router.use("/category",authMiddleware.verityToken, categoryRoutes);
router.use("/tour",authMiddleware.verityToken, tourRoutes);
router.use("/order",authMiddleware.verityToken, orderRoutes);
router.use("/user",authMiddleware.verityToken, userRoutes);
router.use("/contact",authMiddleware.verityToken, contactRoutes);
router.use("/setting",authMiddleware.verityToken, settingRoutes);
router.use("/profile",authMiddleware.verityToken, profileRoutes);

router.use((req, res) => {
  res.status(404).send("404 Not Found");
});
module.exports = router;
