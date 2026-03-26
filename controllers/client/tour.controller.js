const Tour = require("../../models/tour.model");

module.exports.list = async (req, res) => {
  const tourList = await Tour.find({});
  console.log(tourList);

  res.render("client/pages/tour-list.pug", {
    pageTitle: "Danh sach",
    tourList: tourList,
  });
};
module.exports.detail = async (req, res) => {
  res.render("client/pages/tour-detail.pug", {
    pageTitle: "Chi tiết tour",
  });
};
