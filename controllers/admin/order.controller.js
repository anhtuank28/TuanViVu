module.exports.list = async (req, res) => {
  res.render("admin/pages/order-list", {
    pageTitle: "quan ly don hang",
  });
};
module.exports.edit = async (req, res) => {
  res.render("admin/pages/order-edit", {
    pageTitle: "Đơn hàng",
  });
};
