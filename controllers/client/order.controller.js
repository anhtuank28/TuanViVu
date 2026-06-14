const Tour = require("../../models/tour.model");
const Order = require("../../models/order.model");
const variableHelper=require("../../config/variable");
const generateHelper=require("../../helpers/generate.helper");

module.exports.createOrder = async (req, res) => {
    try {
        req.body.orderCode="OD"+generateHelper.generateRandomNumber(10);
        // --- BƯỚC 1: KIỂM TRA TẤT CẢ CÁC TOUR (VALIDATION) ---
        let itemsData = [];

        for (const item of req.body.items) {
            const infoTour = await Tour.findOne({
                _id: item.tourId || item.id,
                status: "active",
                deleted: false
            });

            if (!infoTour) {
                return res.json({
                    code: "error",
                    message: "Một số tour trong đơn hàng không tồn tại hoặc đã ngừng hoạt động!"
                });
            }

            // Gắn thêm dữ liệu vào item
            item.priceNewAdult = infoTour.priceNewAdult;
            item.priceNewChildren = infoTour.priceNewChildren;
            item.priceNewBaby = infoTour.priceNewBaby;
            item.departureDate = infoTour.departureDate;
            item.avatar = infoTour.avatar;
            item.name = infoTour.name;
            
            // Kiểm tra số lượng còn lại
            if (infoTour.stockAdult < item.quantityAdult || infoTour.stockChildren < item.quantityChildren || infoTour.stockBaby < item.quantityBaby) {
                return res.json({
                    code: "error",
                    message: `Số lượng chỗ của tour ${item.name} đã hết, vui lòng chọn lại`
                });
            }

            itemsData.push({
                item: item,
                infoTour: infoTour
            });
        }

        // --- BƯỚC 2: TRỪ KHO VÀ TÍNH TIỀN (EXECUTION) ---
        for (const data of itemsData) {
            await Tour.updateOne({
                _id: data.item.tourId || data.item.id
            }, {
                stockAdult: data.infoTour.stockAdult - data.item.quantityAdult,
                stockChildren: data.infoTour.stockChildren - data.item.quantityChildren,
                stockBaby: data.infoTour.stockBaby - data.item.quantityBaby,
            });
        }

        req.body.subTotal = req.body.items.reduce((sum, item) => {
            // Frontend đã lọc các item được check, nên ở đây tính tổng hết
            return sum + ((item.priceNewAdult * item.quantityAdult) + (item.priceNewChildren * item.quantityChildren) + (item.priceNewBaby * item.quantityBaby));
        }, 0);

        // tạm tính
        req.body.discount = 0;
        // thanh toán
        req.body.total = req.body.subTotal - req.body.discount;
        // trạng thái thanh toán
        req.body.paymentStatus = "unpaid";
        // trạng thái đơn hàng
        req.body.status = "initial";
        
        const newRecord = new Order(req.body);
        await newRecord.save();

        return res.json({
            code: "success",
            message: "Đặt hàng thành công",
            orderId: newRecord.id
        });

    } catch (error) {
        console.error(error);
        return res.json({
            code: "error",
            message: "Lỗi hệ thống"
        });
    }
}

module.exports.success = async (req, res) => {
    try {
        const orderId = req.query.orderId;
        let order = null;
        if (orderId) {
            // Dùng lean() để Mongoose trả về plain object, giúp ta có thể dễ dàng gắn thêm thuộc tính
            order = await Order.findOne({ _id: orderId }).lean();
        }

        if (order) {
            const methodInfo = variableHelper.paymentMethod.find(item => item.value == order.paymentMethod);
            order.paymentMethodName = methodInfo ? methodInfo.label : "Thanh toán trực tiếp";
        }
        res.render("client/pages/order-success", {
            pageTitle: "Đặt hàng thành công",
            order: order
        });
    } catch (error) {
        console.error(error);
        res.redirect("/");
    }
}