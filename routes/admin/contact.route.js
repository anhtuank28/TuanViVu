const router = require("express").Router();

const contactController = require("../../controllers/admin/contact.controller");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

router.get("/list", authMiddleware.requireAuth("contact-view"), contactController.list);
module.exports = router;
