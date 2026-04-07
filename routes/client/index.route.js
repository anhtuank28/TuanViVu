const router = require("express").Router();
const tourRoutes = require("./tour.route");
const homeRoutes = require("./home.route");
const cartRoutes = require("./cart.route");

router.use("/tours", tourRoutes);
router.use("/", homeRoutes);
router.use("/cart", cartRoutes);


module.exports = router;
