require("dotenv").config();
const mongoose = require("mongoose");
const Category = require("./models/category.model");
const Tour = require("./models/tour.model");

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);
        console.log("Connected to MongoDB!");

        // 1. Delete old data
        await Category.deleteMany({});
        await Tour.deleteMany({});
        console.log("Cleared old Categories and Tours.");

        // 2. Create Categories
        const catTrongNuoc = await Category.create({
            name: "Tour Trong Nước",
            parent: "",
            position: 1,
            status: "active",
            description: "Khám phá vẻ đẹp mọi miền tổ quốc Việt Nam.",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730334/tours_mock/yeahkbuvaxgecjl6u1pl.jpg"
        });

        const catNuocNgoai = await Category.create({
            name: "Tour Nước Ngoài",
            parent: "",
            position: 2,
            status: "active",
            description: "Du ngoạn khắp năm châu cùng những điểm đến tuyệt vời.",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730335/tours_mock/ckg0hya3uymcoowm7y5c.jpg"
        });

        // Children Trong Nước
        const catMienBac = await Category.create({
            name: "Miền Bắc",
            parent: catTrongNuoc._id.toString(),
            position: 1,
            status: "active",
            description: "Hà Nội, Sapa, Hạ Long, Ninh Bình...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg"
        });

        const catMienTrung = await Category.create({
            name: "Miền Trung",
            parent: catTrongNuoc._id.toString(),
            position: 2,
            status: "active",
            description: "Đà Nẵng, Huế, Hội An, Phú Yên...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730337/tours_mock/jx0tceixz7f3xhscyywl.jpg"
        });

        const catMienNam = await Category.create({
            name: "Miền Nam",
            parent: catTrongNuoc._id.toString(),
            position: 3,
            status: "active",
            description: "TP.HCM, Cần Thơ, Phú Quốc, Vũng Tàu...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730337/tours_mock/jx0tceixz7f3xhscyywl.jpg"
        });

        // Children Nước Ngoài
        const catChauA = await Category.create({
            name: "Châu Á",
            parent: catNuocNgoai._id.toString(),
            position: 1,
            status: "active",
            description: "Nhật Bản, Hàn Quốc, Đài Loan, Thái Lan...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730339/tours_mock/ssfew1hjfdlxq0j6tka9.jpg"
        });

        const catChauAu = await Category.create({
            name: "Châu Âu",
            parent: catNuocNgoai._id.toString(),
            position: 2,
            status: "active",
            description: "Pháp, Ý, Thụy Sĩ, Hà Lan...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730339/tours_mock/t4e7aemhj6ccwclohwgh.jpg"
        });

        console.log("Categories created!");

        // 3. Create Tours
        const tours = [
            {
                name: "Tour Sapa 3 Ngày 2 Đêm: Khám phá đỉnh Fansipan",
                category: catMienBac._id.toString(),
                position: 1,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg",
                priceAdult: 3500000,
                priceChildren: 2500000,
                priceBaby: 1000000,
                priceNewAdult: 3000000,
                priceNewChildren: 2000000,
                priceNewBaby: 800000,
                stockAdult: 20,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Hà Nội", "Lào Cai", "Sapa"],
                time: "3 Ngày 2 Đêm",
                vehicle: "Ô tô giường nằm",
                departureDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
                information: "<p>Chuyến đi khám phá thành phố sương mù Sapa, chinh phục đỉnh Fansipan hùng vĩ.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Sapa - Bản Cát Cát", description: "<p>Khởi hành từ Hà Nội. Chiều thăm bản Cát Cát, tìm hiểu văn hóa người H'Mông.</p>" },
                    { title: "Ngày 2: Sapa - Fansipan - Nhà thờ đá", description: "<p>Sáng đi cáp treo lên đỉnh Fansipan. Chiều dạo quanh thị trấn, thăm Nhà thờ đá.</p>" },
                    { title: "Ngày 3: Sapa - Hàm Rồng - Hà Nội", description: "<p>Tham quan núi Hàm Rồng, ngắm toàn cảnh Sapa. Chiều lên xe về Hà Nội.</p>" }
                ]
            },
            {
                name: "Tour Vịnh Hạ Long 2 Ngày 1 Đêm: Ngủ đêm trên du thuyền 5 sao",
                category: catMienBac._id.toString(),
                position: 2,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg",
                priceAdult: 4500000,
                priceChildren: 3000000,
                priceBaby: 1500000,
                priceNewAdult: 4200000,
                priceNewChildren: 2800000,
                priceNewBaby: 1200000,
                stockAdult: 15,
                stockChildren: 5,
                stockBaby: 3,
                locations: ["Hà Nội", "Quảng Ninh", "Hạ Long"],
                time: "2 Ngày 1 Đêm",
                vehicle: "Xe Limousine",
                departureDate: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000),
                information: "<p>Trải nghiệm nghỉ dưỡng đẳng cấp trên du thuyền 5 sao tại kỳ quan thiên nhiên thế giới Vịnh Hạ Long.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Tuần Châu - Vịnh Hạ Long", description: "<p>Đến Tuần Châu, lên du thuyền. Buổi chiều chèo thuyền Kayak và tắm biển.</p>" },
                    { title: "Ngày 2: Hạ Long - Hang Sửng Sốt - Hà Nội", description: "<p>Sáng tham quan hang Sửng Sốt tuyệt đẹp. Trưa dùng bữa và quay về Hà Nội.</p>" }
                ]
            },
            {
                name: "Tour Đà Nẵng - Hội An - Bà Nà Hills 4 Ngày 3 Đêm",
                category: catMienTrung._id.toString(),
                position: 3,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730342/tours_mock/uyuaxhuuh14m7hhjdotv.jpg",
                priceAdult: 6500000,
                priceChildren: 4500000,
                priceBaby: 2000000,
                priceNewAdult: 5900000,
                priceNewChildren: 4000000,
                priceNewBaby: 1800000,
                stockAdult: 25,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Đà Nẵng", "Hội An"],
                time: "4 Ngày 3 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá thành phố biển Đà Nẵng năng động và phố cổ Hội An bình yên.</p>",
                schedules: [
                    { title: "Ngày 1: Bay đến Đà Nẵng - Phố cổ Hội An", description: "<p>Đón khách tại sân bay. Chiều di chuyển tham quan Phố cổ Hội An, thả đèn hoa đăng.</p>" },
                    { title: "Ngày 2: Khám phá Bà Nà Hills", description: "<p>Lên Bà Nà bằng cáp treo, thăm Cầu Vàng, Làng Pháp và Fantasy Park.</p>" },
                    { title: "Ngày 3: Bán đảo Sơn Trà - Chùa Linh Ứng", description: "<p>Tham quan Chùa Linh Ứng, chiều tắm biển Mỹ Khê.</p>" },
                    { title: "Ngày 4: Mua sắm đặc sản - Tiễn sân bay", description: "<p>Đi chợ Hàn mua sắm đặc sản. Xe đưa đoàn ra sân bay trở về.</p>" }
                ]
            },
            {
                name: "Tour Phú Quốc 3 Ngày 2 Đêm: Thiên đường nhiệt đới",
                category: catMienNam._id.toString(),
                position: 4,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730337/tours_mock/jx0tceixz7f3xhscyywl.jpg",
                priceAdult: 5500000,
                priceChildren: 3500000,
                priceBaby: 1500000,
                priceNewAdult: 4900000,
                priceNewChildren: 3200000,
                priceNewBaby: 1200000,
                stockAdult: 30,
                stockChildren: 15,
                stockBaby: 5,
                locations: ["Kiên Giang", "Phú Quốc"],
                time: "3 Ngày 2 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000),
                information: "<p>Đắm chìm trong làn nước trong xanh và bãi cát trắng mịn của Đảo ngọc Phú Quốc.</p>",
                schedules: [
                    { title: "Ngày 1: Chào đón Phú Quốc - Grand World", description: "<p>Đến Phú Quốc. Tối dạo chơi tại siêu quần thể Grand World, xem show Sắc màu Venice.</p>" },
                    { title: "Ngày 2: Khám phá Nam Đảo - Lặn ngắm san hô", description: "<p>Lên cano ra các đảo nhỏ, tắm biển và lặn ngắm san hô tại hòn Móng Tay.</p>" },
                    { title: "Ngày 3: Safari Phú Quốc - Tiễn khách", description: "<p>Tham quan vườn thú mở Vinpearl Safari. Chiều di chuyển ra sân bay.</p>" }
                ]
            },
            {
                name: "Tour Nhật Bản Mùa Lá Đỏ 6 Ngày 5 Đêm: Tokyo - Fuji - Kyoto - Osaka",
                category: catChauA._id.toString(),
                position: 5,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730343/tours_mock/dnduzmuqukvabfwvmnxa.jpg",
                priceAdult: 35000000,
                priceChildren: 28000000,
                priceBaby: 10000000,
                priceNewAdult: 33000000,
                priceNewChildren: 26000000,
                priceNewBaby: 9000000,
                stockAdult: 20,
                stockChildren: 5,
                stockBaby: 2,
                locations: ["Tokyo", "Kyoto", "Osaka"],
                time: "6 Ngày 5 Đêm",
                vehicle: "Máy bay (Vietnam Airlines)",
                departureDate: new Date(new Date().getTime() + 45 * 24 * 60 * 60 * 1000),
                information: "<p>Thưởng ngoạn sắc thu Nhật Bản rực rỡ với cung đường Vàng huyền thoại.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Tokyo", description: "<p>Tập trung tại sân bay Nội Bài, đáp chuyến bay đêm đi Tokyo.</p>" },
                    { title: "Ngày 2: Khám phá Tokyo", description: "<p>Tham quan Hoàng Cung, tháp truyền hình Tokyo Skytree, mua sắm tại Ginza.</p>" },
                    { title: "Ngày 3: Tokyo - Núi Phú Sĩ", description: "<p>Di chuyển đến Hakone, ngắm núi Phú Sĩ từ xa. Tắm onsen truyền thống.</p>" },
                    { title: "Ngày 4: Trải nghiệm tàu Shinkansen - Kyoto", description: "<p>Trải nghiệm tàu siêu tốc Shinkansen đi Kyoto. Thăm chùa Thanh Thủy, Rừng trúc Arashiyama.</p>" },
                    { title: "Ngày 5: Kyoto - Osaka", description: "<p>Di chuyển đi Osaka. Tham quan lâu đài Osaka, tự do mua sắm tại Namba.</p>" },
                    { title: "Ngày 6: Osaka - Hà Nội", description: "<p>Sáng tự do. Chiều di chuyển ra sân bay Kansai về Việt Nam.</p>" }
                ]
            },
            {
                name: "Tour Châu Âu 9 Ngày 8 Đêm: Pháp - Thụy Sĩ - Ý",
                category: catChauAu._id.toString(),
                position: 6,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730344/tours_mock/xwsdjgcws13yk10xhw9c.jpg",
                priceAdult: 65000000,
                priceChildren: 55000000,
                priceBaby: 20000000,
                priceNewAdult: 62000000,
                priceNewChildren: 52000000,
                priceNewBaby: 18000000,
                stockAdult: 25,
                stockChildren: 0,
                stockBaby: 0,
                locations: ["Paris", "Lucerne", "Rome", "Venice"],
                time: "9 Ngày 8 Đêm",
                vehicle: "Máy bay, Tàu cao tốc",
                departureDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
                information: "<p>Hành trình khám phá lục địa già qua 3 quốc gia xinh đẹp và lãng mạn nhất Châu Âu.</p>",
                schedules: [
                    { title: "Ngày 1-3: Khám phá Paris hoa lệ", description: "<p>Bay đến Paris. Tham quan Tháp Eiffel, Bảo tàng Louvre, dạo thuyền trên sông Seine.</p>" },
                    { title: "Ngày 4-5: Thụy Sĩ thanh bình", description: "<p>Đi tàu đến Lucerne, Thụy Sĩ. Lên đỉnh Titlis tuyết trắng, dạo quanh hồ Lucerne.</p>" },
                    { title: "Ngày 6-7: Venice thơ mộng", description: "<p>Di chuyển đến Venice, Ý. Đi thuyền Gondola lãng mạn trên các con kênh nhỏ.</p>" },
                    { title: "Ngày 8: Thành Rome cổ kính", description: "<p>Đến Rome, tham quan đấu trường La Mã Colosseum, đài phun nước Trevi.</p>" },
                    { title: "Ngày 9: Trở về Việt Nam", description: "<p>Kết thúc hành trình, đáp chuyến bay từ Rome về Hà Nội/TP.HCM.</p>" }
                ]
            }
        ];

        for (let tour of tours) {
            await Tour.create(tour);
        }

        console.log("Tours created!");
        console.log("Seed data successfully completed.");
        process.exit(0);

    } catch (error) {
        console.error("Seed data error: ", error);
        process.exit(1);
    }
};

seedDatabase();
