module.exports.list = async (req, res) => {
  res.render("admin/pages/tour-list", {
    pageTitle: "Quản lý tour",
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/pages/tour-create", {
    pageTitle: "tạo tour",
  });
};
module.exports.trash = async (req, res) => {
  res.render("admin/pages/tour-trash", {
    pageTitle: "thùng rác tour",
  });
};
