const router = require("express").Router();
const multer = require("multer"); //thư viện giúp upload lên các file, video, ảnh
const cloudinaryHelper = require("../../helpers/cloudinary.helper");

const upload = multer({ storage: cloudinaryHelper.storage });

const settingController = require("../../controllers/admin/setting.controller");

router.get("/list", settingController.list);
router.get("/website-info", settingController.websiteInfo);
router.patch("/website-info",upload.fields([
    {name:"logo", maxCount: 1},
    {name: "favicon",maxCount:1}
]), settingController.websiteInfoPatch);
router.get("/account-admin/list", settingController.accountAdminList);
router.get("/account-admin/create", settingController.accountAdminCreate);
router.get("/role/list", settingController.roleList);
router.get("/role/create", settingController.roleCreate);
router.post("/role/create", settingController.roleCreatePost);
router.patch("/role/delete/:id", settingController.roleDelete);
router.patch("/role/change-multi", settingController.roleChangeMulti);

// Trash routes
router.get("/role/trash", settingController.roleTrash);
router.patch("/role/undo/:id", settingController.roleUndo);
router.patch("/role/delete-destroy/:id", settingController.roleDeleteDestroy);
router.patch("/role/trash/change-multi", settingController.roleTrashChangeMulti);

router.get("/role/edit/:id", settingController.roleEdit);
router.patch("/role/edit/:id", settingController.roleEditPatch);


module.exports = router;
