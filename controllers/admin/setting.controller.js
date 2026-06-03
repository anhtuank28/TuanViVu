const SettingwebsiteInfo = require("../../models/setting-website-model")

const permissionConfig=require("../../config/permission");
const Role = require("../../models/role.model");

module.exports.list = async (req, res) => {
  res.render("admin/pages/setting-list", {
    pageTitle: "cài đặt chung",
  });
};
module.exports.websiteInfo = async (req, res) => {
  let settingWebsiteInfo = await SettingwebsiteInfo.findOne({});

  if (!settingWebsiteInfo) {
    settingWebsiteInfo = {
      websiteName: "",
      phone: "",
      email: "",
      address: "",
      logo: "",
      favicon: ""
    };
  }

  res.render("admin/pages/setting-website-info", {
    pageTitle: "thông tin website",
    settingWebsiteInfo: settingWebsiteInfo
  });
};
module.exports.websiteInfoPatch = async (req, res) => {
  if(req.files && req.files.logo){
    req.body.logo = req.files.logo[0].path;
  } else {
    delete req.body.logo;
  }
  
  if(req.files && req.files.favicon){
    req.body.favicon = req.files.favicon[0].path;
  } else {
    delete req.body.favicon;
  }

  const settingwebsiteInfo = await SettingwebsiteInfo.findOne({});
  if (settingwebsiteInfo) {
    await SettingwebsiteInfo.updateOne({ _id: settingwebsiteInfo.id }, req.body);
  } else {
    const newRecord = new SettingwebsiteInfo(req.body);
    await newRecord.save();
  }

  // Sửa res.flash thành req.flash (nếu bạn dùng thư viện express-flash)
  if (req.flash) {
    req.flash("success", "Cập nhật thành công");
  }

  res.json({
    code: "success"
  });
};
module.exports.accountAdminList = async (req, res) => {
  res.render("admin/pages/setting-account-admin-list", {
    pageTitle: "Tài khoản quản trị",
  });
};
module.exports.accountAdminCreate = async (req, res) => {
  res.render("admin/pages/setting-account-admin-create", {
    pageTitle: "Tạo tài khoản quản trị",
  });
};
module.exports.roleList = async (req, res) => {
  res.render("admin/pages/setting-role-list", {
    pageTitle: "Nhóm quyền",
  });
};
module.exports.roleCreate = async (req, res) => {
  
  res.render("admin/pages/setting-role-create", {
    pageTitle: "Tạo nhóm quyền",
    permissionList: permissionConfig.permissionList
  });
};
module.exports.roleCreatePost = async (req, res) => {
    if (req.account) {
        req.body.createdBy = req.account.id;
        req.body.updatedBy = req.account.id;
    }

    const newRecord= new Role(req.body);
    await newRecord.save();

    if (req.flash) {
        req.flash("success","Tạo nhóm quyền thành công");
    }
    
    res.json({
        code: "success"
    });
};
