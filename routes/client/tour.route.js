const router = require("express").Router();

const tourController = require("../../controllers/client/tour.controller.js");

router.get("/detail", tourController.detail);
module.exports = router;
