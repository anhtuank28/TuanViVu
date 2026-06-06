module.exports.dashboard = async (req, res) => {
  res.render("admin/pages/dashboard", {
    pageTitle: "dashboard",
    overview: {
      totalAdmin: 0,
      totalCategory: 0,
      totalTour: 0,
      totalOrder: 0,
      totalUser: 0
    }
  });
};
