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

        const catChauMy = await Category.create({
            name: "Châu Mỹ",
            parent: catNuocNgoai._id.toString(),
            position: 3,
            status: "active",
            description: "Mỹ, Canada, Brazil, Argentina...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730335/tours_mock/ckg0hya3uymcoowm7y5c.jpg"
        });

        const catChauUc = await Category.create({
            name: "Châu Úc",
            parent: catNuocNgoai._id.toString(),
            position: 4,
            status: "active",
            description: "Úc, New Zealand...",
            avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg"
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
                name: "Tour Hà Giang 3 Ngày 2 Đêm: Mùa Hoa Tam Giác Mạch",
                category: catMienBac._id.toString(),
                position: 15,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg",
                priceAdult: 2800000,
                priceChildren: 2000000,
                priceBaby: 800000,
                priceNewAdult: 2500000,
                priceNewChildren: 1800000,
                priceNewBaby: 500000,
                stockAdult: 20,
                stockChildren: 5,
                stockBaby: 3,
                locations: ["Hà Nội", "Hà Giang"],
                time: "3 Ngày 2 Đêm",
                vehicle: "Ô tô đời mới",
                departureDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
                information: "<p>Chinh phục cao nguyên đá Đồng Văn hùng vĩ và ngắm nhìn mùa hoa tam giác mạch đẹp mơ màng.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Quản Bạ - Yên Minh", description: "<p>Khởi hành đi Hà Giang. Dừng chân tại Cổng trời Quản Bạ, núi đôi Cô Tiên.</p>" },
                    { title: "Ngày 2: Yên Minh - Đồng Văn - Lũng Cú", description: "<p>Thăm Dinh Vua Mèo, chinh phục Cột cờ Lũng Cú. Về phố cổ Đồng Văn.</p>" },
                    { title: "Ngày 3: Đèo Mã Pí Lèng - Hà Giang - Hà Nội", description: "<p>Check-in đèo Mã Pí Lèng, sông Nho Quế. Lên xe trở về Hà Nội.</p>" }
                ]
            },
            {
                name: "Tour Tràng An - Bái Đính 1 Ngày: Cố Đô Hoa Lư",
                category: catMienBac._id.toString(),
                position: 16,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730342/tours_mock/uyuaxhuuh14m7hhjdotv.jpg",
                priceAdult: 900000,
                priceChildren: 600000,
                priceBaby: 200000,
                priceNewAdult: 850000,
                priceNewChildren: 550000,
                priceNewBaby: 150000,
                stockAdult: 30,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Hà Nội", "Ninh Bình"],
                time: "1 Ngày",
                vehicle: "Ô tô",
                departureDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá quần thể danh thắng Tràng An và viếng thăm ngôi chùa lớn nhất Đông Nam Á - Bái Đính.</p>",
                schedules: [
                    { title: "Buổi sáng: Hà Nội - Chùa Bái Đính", description: "<p>Khởi hành đi Ninh Bình. Tham quan chùa Bái Đính với các kỷ lục châu Á.</p>" },
                    { title: "Buổi chiều: Khu du lịch sinh thái Tràng An", description: "<p>Ngồi thuyền nan ngoạn cảnh Tràng An. Trở về Hà Nội vào buổi chiều muộn.</p>" }
                ]
            },
            {
                name: "Tour Nha Trang 4 Ngày 3 Đêm: Đảo ngọc biển xanh",
                category: catMienTrung._id.toString(),
                position: 17,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730337/tours_mock/jx0tceixz7f3xhscyywl.jpg",
                priceAdult: 5000000,
                priceChildren: 3500000,
                priceBaby: 1000000,
                priceNewAdult: 4500000,
                priceNewChildren: 3000000,
                priceNewBaby: 800000,
                stockAdult: 25,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Khánh Hòa", "Nha Trang"],
                time: "4 Ngày 3 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 12 * 24 * 60 * 60 * 1000),
                information: "<p>Tận hưởng không khí biển mát lành và các dịch vụ giải trí đẳng cấp tại VinWonders Nha Trang.</p>",
                schedules: [
                    { title: "Ngày 1: Bay đến Nha Trang", description: "<p>Đón khách tại sân bay Cam Ranh. Nhận phòng và dạo biển đêm.</p>" },
                    { title: "Ngày 2: Vui chơi VinWonders", description: "<p>Khám phá công viên giải trí VinWonders, xem biểu diễn nhạc nước.</p>" },
                    { title: "Ngày 3: Tham quan 3 đảo - Tắm bùn khoáng", description: "<p>Lên cano ra đảo ngắm san hô. Chiều đi tắm bùn khoáng thư giãn.</p>" },
                    { title: "Ngày 4: Chợ Đầm - Tiễn sân bay", description: "<p>Mua sắm đặc sản biển tại chợ Đầm. Ra sân bay kết thúc hành trình.</p>" }
                ]
            },
            {
                name: "Tour Huế - Quảng Bình 3 Ngày 2 Đêm: Khám phá Hang Sơn Đoòng",
                category: catMienTrung._id.toString(),
                position: 18,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730344/tours_mock/xwsdjgcws13yk10xhw9c.jpg",
                priceAdult: 4000000,
                priceChildren: 3000000,
                priceBaby: 1000000,
                priceNewAdult: 3800000,
                priceNewChildren: 2800000,
                priceNewBaby: 800000,
                stockAdult: 15,
                stockChildren: 5,
                stockBaby: 2,
                locations: ["Huế", "Quảng Bình"],
                time: "3 Ngày 2 Đêm",
                vehicle: "Ô tô / Tàu hỏa",
                departureDate: new Date(new Date().getTime() + 8 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá vùng đất di sản miền Trung từ Cố Đô Huế trầm mặc đến Động Phong Nha kỳ vĩ.</p>",
                schedules: [
                    { title: "Ngày 1: Khám phá Cố Đô Huế", description: "<p>Thăm Đại Nội, Chùa Thiên Mụ. Tối nghe ca Huế trên sông Hương.</p>" },
                    { title: "Ngày 2: Huế - Động Phong Nha", description: "<p>Di chuyển ra Quảng Bình. Đi thuyền tham quan Động Phong Nha.</p>" },
                    { title: "Ngày 3: Động Thiên Đường - Trở về", description: "<p>Khám phá 'Hoàng cung trong lòng đất' Động Thiên Đường. Lên xe trở về.</p>" }
                ]
            },
            {
                name: "Tour Miền Tây 2 Ngày 1 Đêm: Mỹ Tho - Cần Thơ",
                category: catMienNam._id.toString(),
                position: 19,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730343/tours_mock/dnduzmuqukvabfwvmnxa.jpg",
                priceAdult: 1500000,
                priceChildren: 1000000,
                priceBaby: 300000,
                priceNewAdult: 1300000,
                priceNewChildren: 800000,
                priceNewBaby: 200000,
                stockAdult: 20,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["TP.HCM", "Tiền Giang", "Cần Thơ"],
                time: "2 Ngày 1 Đêm",
                vehicle: "Ô tô",
                departureDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000),
                information: "<p>Hành trình khám phá vùng sông nước miệt vườn Miền Tây dân dã và mộc mạc.</p>",
                schedules: [
                    { title: "Ngày 1: TP.HCM - Mỹ Tho - Bến Tre - Cần Thơ", description: "<p>Tham quan Cồn Phụng, Cồn Thới Sơn, nghe đờn ca tài tử. Chiều di chuyển về Cần Thơ.</p>" },
                    { title: "Ngày 2: Chợ nổi Cái Răng - Trở về TP.HCM", description: "<p>Sáng sớm đi thuyền thăm Chợ nổi Cái Răng. Trưa khởi hành về lại Sài Gòn.</p>" }
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
            },
            {
                name: "Tour Hàn Quốc 5 Ngày 4 Đêm: Seoul - Nami - Everland",
                category: catChauA._id.toString(),
                position: 7,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730343/tours_mock/dnduzmuqukvabfwvmnxa.jpg",
                priceAdult: 18000000,
                priceChildren: 15000000,
                priceBaby: 5000000,
                priceNewAdult: 16000000,
                priceNewChildren: 13500000,
                priceNewBaby: 4500000,
                stockAdult: 25,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Seoul", "Nami"],
                time: "5 Ngày 4 Đêm",
                vehicle: "Máy bay",
                departureDate: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá xứ sở Kim Chi với những điểm đến lãng mạn như đảo Nami và công viên giải trí Everland.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Seoul", description: "<p>Bay từ Hà Nội đi Seoul. Nhận phòng và nghỉ ngơi.</p>" },
                    { title: "Ngày 2: Seoul - Đảo Nami", description: "<p>Tham quan Đảo Nami lãng mạn, nơi quay bộ phim Bản Tình Ca Mùa Đông.</p>" },
                    { title: "Ngày 3: Công viên Everland", description: "<p>Vui chơi thỏa thích tại công viên giải trí lớn nhất Hàn Quốc - Everland.</p>" },
                    { title: "Ngày 4: Khám phá Seoul - Cảnh Phúc Cung", description: "<p>Tham quan Cảnh Phúc Cung, tháp Namsan, mua sắm mỹ phẩm và nhân sâm.</p>" },
                    { title: "Ngày 5: Seoul - Hà Nội", description: "<p>Mua sắm tự do và ra sân bay trở về Hà Nội.</p>" }
                ]
            },
            {
                name: "Tour Thái Lan 5 Ngày 4 Đêm: Bangkok - Pattaya",
                category: catChauA._id.toString(),
                position: 8,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730339/tours_mock/ssfew1hjfdlxq0j6tka9.jpg",
                priceAdult: 8500000,
                priceChildren: 7000000,
                priceBaby: 2500000,
                priceNewAdult: 7900000,
                priceNewChildren: 6500000,
                priceNewBaby: 2000000,
                stockAdult: 30,
                stockChildren: 15,
                stockBaby: 10,
                locations: ["Bangkok", "Pattaya"],
                time: "5 Ngày 4 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
                information: "<p>Trải nghiệm xứ sở Chùa Vàng với cung đường kinh điển Bangkok - Pattaya vô cùng hấp dẫn.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Bangkok - Pattaya", description: "<p>Đến Bangkok, di chuyển thẳng về thành phố biển Pattaya.</p>" },
                    { title: "Ngày 2: Đảo Coral - Alcazar Show", description: "<p>Tắm biển tại Đảo Coral. Buổi tối xem Alcazar Show của những người đẹp chuyển giới.</p>" },
                    { title: "Ngày 3: Pattaya - Trân Bảo Phật Sơn - Bangkok", description: "<p>Tham quan Trân Bảo Phật Sơn, về lại Bangkok. Đi dạo chợ đêm.</p>" },
                    { title: "Ngày 4: Dạo thuyền sông Chao Phraya - Chùa Thuyền", description: "<p>Dạo thuyền trên sông Chao Phraya, tham quan Chùa Thuyền Wat Yannawa.</p>" },
                    { title: "Ngày 5: Mua sắm - Trở về Việt Nam", description: "<p>Tự do mua sắm tại Big C, Central World. Ra sân bay về nước.</p>" }
                ]
            },
            {
                name: "Tour Bali - Indonesia 4 Ngày 3 Đêm: Thiên đường nghỉ dưỡng",
                category: catChauA._id.toString(),
                position: 9,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730335/tours_mock/ckg0hya3uymcoowm7y5c.jpg",
                priceAdult: 12500000,
                priceChildren: 10000000,
                priceBaby: 3000000,
                priceNewAdult: 11500000,
                priceNewChildren: 9000000,
                priceNewBaby: 2500000,
                stockAdult: 20,
                stockChildren: 5,
                stockBaby: 2,
                locations: ["Bali"],
                time: "4 Ngày 3 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 40 * 24 * 60 * 60 * 1000),
                information: "<p>Tận hưởng kỳ nghỉ trong mơ tại hòn đảo thiên đường Bali xinh đẹp.</p>",
                schedules: [
                    { title: "Ngày 1: TP.HCM/Hà Nội - Bali", description: "<p>Bay đến sân bay Denpasar. Xe đưa đoàn về khách sạn nhận phòng, nghỉ ngơi.</p>" },
                    { title: "Ngày 2: Ngôi làng Ubud - Cung điện nước Tirta Empul", description: "<p>Khám phá làng nghệ thuật Ubud, tắm nước thánh tại đền Tirta Empul.</p>" },
                    { title: "Ngày 3: Đền Tanah Lot - Ngắm hoàng hôn", description: "<p>Tham quan ngôi đền linh thiêng Tanah Lot nằm trên bãi biển. Ngắm hoàng hôn tuyệt đẹp.</p>" },
                    { title: "Ngày 4: Tự do khám phá - Trở về Việt Nam", description: "<p>Tự do mua sắm quà lưu niệm. Ra sân bay trở về Việt Nam.</p>" }
                ]
            },
            {
                name: "Tour Mỹ 8 Ngày 7 Đêm: Bờ Tây - Bờ Đông",
                category: catChauMy._id.toString(),
                position: 10,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730342/tours_mock/uyuaxhuuh14m7hhjdotv.jpg",
                priceAdult: 85000000,
                priceChildren: 70000000,
                priceBaby: 25000000,
                priceNewAdult: 80000000,
                priceNewChildren: 65000000,
                priceNewBaby: 20000000,
                stockAdult: 15,
                stockChildren: 5,
                stockBaby: 2,
                locations: ["New York", "Washington D.C", "Los Angeles", "Las Vegas"],
                time: "8 Ngày 7 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 90 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá giấc mơ Mỹ với hành trình liên tuyến Bờ Đông - Bờ Tây vĩ đại.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - New York", description: "<p>Bay từ Việt Nam sang New York, nhận phòng khách sạn.</p>" },
                    { title: "Ngày 2: Khám phá New York", description: "<p>Thăm Tượng Nữ Thần Tự Do, Quảng trường Thời Đại, Phố Wall.</p>" },
                    { title: "Ngày 3: New York - Washington D.C", description: "<p>Di chuyển tới Washington, thăm Nhà Trắng, Điện Capitol.</p>" },
                    { title: "Ngày 4: Washington D.C - Los Angeles", description: "<p>Bay sang Bờ Tây, hạ cánh tại Los Angeles.</p>" },
                    { title: "Ngày 5: Hollywood - Universal Studios", description: "<p>Thăm Đại lộ Danh Vọng, công viên Universal Studios.</p>" },
                    { title: "Ngày 6: Los Angeles - Las Vegas", description: "<p>Di chuyển đến thủ phủ giải trí Las Vegas. Thăm các casino xa hoa.</p>" },
                    { title: "Ngày 7: Hoover Dam - Mua sắm", description: "<p>Tham quan đập thủy điện Hoover Dam. Tự do mua sắm hàng hiệu.</p>" },
                    { title: "Ngày 8: Las Vegas - Việt Nam", description: "<p>Ra sân bay đáp chuyến bay về lại Việt Nam.</p>" }
                ]
            },
            {
                name: "Tour Úc 6 Ngày 5 Đêm: Sydney - Melbourne",
                category: catChauUc._id.toString(),
                position: 11,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730337/tours_mock/jx0tceixz7f3xhscyywl.jpg",
                priceAdult: 45000000,
                priceChildren: 35000000,
                priceBaby: 15000000,
                priceNewAdult: 42000000,
                priceNewChildren: 32000000,
                priceNewBaby: 12000000,
                stockAdult: 20,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Sydney", "Melbourne"],
                time: "6 Ngày 5 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000),
                information: "<p>Hành trình khám phá xứ sở Kangaroo xinh đẹp và bình yên.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội/TP.HCM - Sydney", description: "<p>Bay qua đêm đến Sydney.</p>" },
                    { title: "Ngày 2: Khám phá Sydney", description: "<p>Thăm Nhà hát Con Sò (Opera House), cầu cảng Sydney.</p>" },
                    { title: "Ngày 3: Blue Mountains - Công viên động vật hoang dã", description: "<p>Tham quan vườn quốc gia Blue Mountains, ngắm Kangaroo và Koala.</p>" },
                    { title: "Ngày 4: Sydney - Melbourne", description: "<p>Bay sang Melbourne. Chiều thăm chợ Queen Victoria, ga tàu Flinders.</p>" },
                    { title: "Ngày 5: Great Ocean Road - Dandenong", description: "<p>Đi tàu hơi nước Puffing Billy, ngắm cảnh thiên nhiên hùng vĩ.</p>" },
                    { title: "Ngày 6: Melbourne - Việt Nam", description: "<p>Mua sắm đặc sản Úc và ra sân bay trở về.</p>" }
                ]
            },
            {
                name: "Tour Singapore - Malaysia 5 Ngày 4 Đêm",
                category: catChauA._id.toString(),
                position: 12,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730344/tours_mock/xwsdjgcws13yk10xhw9c.jpg",
                priceAdult: 11000000,
                priceChildren: 9000000,
                priceBaby: 4000000,
                priceNewAdult: 10000000,
                priceNewChildren: 8000000,
                priceNewBaby: 3500000,
                stockAdult: 30,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Singapore", "Kuala Lumpur"],
                time: "5 Ngày 4 Đêm",
                vehicle: "Máy bay & Ô tô",
                departureDate: new Date(new Date().getTime() + 25 * 24 * 60 * 60 * 1000),
                information: "<p>Liên tuyến khám phá Đảo Quốc Sư Tử hiện đại và nét văn hóa đa dạng của Malaysia.</p>",
                schedules: [
                    { title: "Ngày 1: Việt Nam - Singapore", description: "<p>Đến Singapore. Thăm Gardens by the Bay, Công viên Merlion.</p>" },
                    { title: "Ngày 2: Đảo Sentosa - Malaysia", description: "<p>Khám phá đảo Sentosa. Chiều di chuyển qua cửa khẩu sang Malaysia (Johor Bahru).</p>" },
                    { title: "Ngày 3: Malacca - Kuala Lumpur", description: "<p>Tham quan thành phố cổ Malacca. Di chuyển về Kuala Lumpur.</p>" },
                    { title: "Ngày 4: Tháp Đôi Petronas - Động Batu", description: "<p>Chụp ảnh Tháp Đôi Petronas, thăm Động Batu, mua sắm đồng hồ và socola.</p>" },
                    { title: "Ngày 5: Kuala Lumpur - Việt Nam", description: "<p>Tham quan Quảng trường Độc Lập. Ra sân bay về Việt Nam.</p>" }
                ]
            },
            {
                name: "Tour Đài Loan 5 Ngày 4 Đêm: Đài Bắc - Đài Trung - Cao Hùng",
                category: catChauA._id.toString(),
                position: 13,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730341/tours_mock/h7mk0f1bwjxnexcu7cgh.jpg",
                priceAdult: 12000000,
                priceChildren: 10000000,
                priceBaby: 3000000,
                priceNewAdult: 11000000,
                priceNewChildren: 9000000,
                priceNewBaby: 2500000,
                stockAdult: 25,
                stockChildren: 10,
                stockBaby: 5,
                locations: ["Đài Bắc", "Đài Trung", "Cao Hùng"],
                time: "5 Ngày 4 Đêm",
                vehicle: "Máy bay khứ hồi",
                departureDate: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000),
                information: "<p>Hành trình khám phá hòn đảo Đài Loan với phong cảnh tuyệt mỹ và ẩm thực phong phú.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - Đào Viên - Đài Trung", description: "<p>Bay đến Đào Viên, di chuyển đi Đài Trung. Dạo chợ đêm Phùng Giáp.</p>" },
                    { title: "Ngày 2: Hồ Nhật Nguyệt - Miếu Văn Võ", description: "<p>Dạo thuyền ngắm cảnh Hồ Nhật Nguyệt. Thăm Miếu Văn Võ.</p>" },
                    { title: "Ngày 3: Cao Hùng - Phật Quang Sơn", description: "<p>Di chuyển đến Cao Hùng, thăm quần thể Phật giáo lớn nhất Đài Loan - Phật Quang Sơn.</p>" },
                    { title: "Ngày 4: Đài Bắc - Tháp 101 - Phố cổ Thập Phần", description: "<p>Quay lại Đài Bắc, thả đèn trời tại Thập Phần, chụp ảnh cùng Tháp Taipei 101.</p>" },
                    { title: "Ngày 5: Bảo tàng Cố Cung - Hà Nội", description: "<p>Tham quan bảo tàng, mua sắm bánh dứa đặc sản. Về nước.</p>" }
                ]
            },
            {
                name: "Tour Anh Quốc 7 Ngày 6 Đêm: London - Manchester - Edinburgh",
                category: catChauAu._id.toString(),
                position: 14,
                status: "active",
                avatar: "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780730335/tours_mock/ckg0hya3uymcoowm7y5c.jpg",
                priceAdult: 75000000,
                priceChildren: 60000000,
                priceBaby: 20000000,
                priceNewAdult: 72000000,
                priceNewChildren: 55000000,
                priceNewBaby: 18000000,
                stockAdult: 15,
                stockChildren: 0,
                stockBaby: 0,
                locations: ["London", "Manchester", "Edinburgh"],
                time: "7 Ngày 6 Đêm",
                vehicle: "Máy bay, Tàu lửa",
                departureDate: new Date(new Date().getTime() + 75 * 24 * 60 * 60 * 1000),
                information: "<p>Khám phá vương quốc sương mù với những di sản văn hóa và kiến trúc đồ sộ.</p>",
                schedules: [
                    { title: "Ngày 1: Hà Nội - London", description: "<p>Đến London, nhận phòng khách sạn và dạo phố tự do.</p>" },
                    { title: "Ngày 2: Khám phá London", description: "<p>Thăm tháp đồng hồ Big Ben, vòng quay London Eye, cung điện Buckingham.</p>" },
                    { title: "Ngày 3: Lâu đài Windsor - Bãi đá Stonehenge", description: "<p>Khám phá di sản thế giới bí ẩn Stonehenge và cung điện hoàng gia Windsor.</p>" },
                    { title: "Ngày 4: London - Manchester", description: "<p>Đi tàu tới Manchester. Thăm sân vận động Old Trafford nổi tiếng.</p>" },
                    { title: "Ngày 5: Manchester - Edinburgh", description: "<p>Di chuyển đến thủ đô của Scotland - Edinburgh. Ngắm kiến trúc cổ kính.</p>" },
                    { title: "Ngày 6: Lâu đài Edinburgh - Mua sắm", description: "<p>Tham quan lâu đài Edinburgh trên núi lửa đã tắt. Tự do mua sắm.</p>" },
                    { title: "Ngày 7: Edinburgh - Việt Nam", description: "<p>Ra sân bay, nối chuyến về lại Việt Nam.</p>" }
                ]
            }
        ];

        let index = 0;
        for (let tour of tours) {
            tour.isFeatured = index < 4;
            await Tour.create(tour);
            index++;
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
