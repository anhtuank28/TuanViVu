const router = require("express").Router();

const accountController = require("../../controllers/admin/account.controller");
const accountValidate = require("../../validates/admin/account.validate");
router.get("/login", accountController.login);
router.get("/register", accountController.register);
router.post(
  "/register",
  accountValidate.registerPost,
  accountController.registerPost,
);
router.get("/register-initial", accountController.registerInitial);
router.get("/forgot-pasword", accountController.forgotPassword);
router.get("/otp-pasword", accountController.otpPassword);
router.get("/reset-pasword", accountController.resetPassword);

module.exports = router;
