const Order = require("../../models/order.model");
const variableConfig=require("../../config/variable");
const moment = require("moment");


module.exports.list = async (req, res) => {
  const find={
    deleted:false
  }

  // Filter processing
  if (req.query.status) {
    find.status = req.query.status;
  }
  if (req.query.paymentMethod) {
    find.paymentMethod = req.query.paymentMethod;
  }
  if (req.query.paymentStatus) {
    find.paymentStatus = req.query.paymentStatus;
  }
  if (req.query.fromDate || req.query.toDate) {
    find.createdAt = {};
    if (req.query.fromDate) {
      find.createdAt.$gte = new Date(req.query.fromDate);
    }
    if (req.query.toDate) {
      const toDate = new Date(req.query.toDate);
      toDate.setHours(23, 59, 59, 999);
      find.createdAt.$lte = toDate;
    }
  }

  // Search keyword (could be phone or orderCode or fullName)
  if (req.query.keyword) {
    const keywordRegex = new RegExp(req.query.keyword, "i");
    find.$or = [
      { orderCode: keywordRegex },
      { fullName: keywordRegex },
      { phone: keywordRegex },
    ];
  }

  const orderList=await Order.find(find).sort({createdAt:'desc'});

  for(const orderDetail of orderList){
    const pm = variableConfig.paymentMethod.find(item=>item.value==orderDetail.paymentMethod);
    orderDetail.paymentMethodName= pm ? pm.label : orderDetail.paymentMethod;

    const ps = variableConfig.paymentStatus.find(item=>item.value==orderDetail.paymentStatus);
    orderDetail.paymentStatusName= ps ? ps.label : orderDetail.paymentStatus;

    const os = variableConfig.orderStatus.find(item=>item.value==orderDetail.status);
    orderDetail.statusName= os ? os.label : orderDetail.status;

    orderDetail.createdAtDate=moment(orderDetail.createdAt).format("HH:mm");
    orderDetail.createdAtTime=moment(orderDetail.createdAt).format("DD/MM/YYYY");
  }

  res.render("admin/pages/order-list", {
    pageTitle: "quan ly don hang",
    orderList:orderList,
    query: req.query
  });
};
module.exports.edit = async (req, res) => {
  res.render("admin/pages/order-edit", {
    pageTitle: "Đơn hàng",
  });
};
