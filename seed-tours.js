const mongoose = require('mongoose');
require('dotenv').config();

const Tour = require('./models/tour.model');
const Category = require('./models/category.model');

const images = [
    "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907695/tours/obp3trbt007wgo9nlc3t.jpg",
    "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907697/tours/dm3h0hkshbqbyavs2gvs.jpg",
    "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907697/tours/ghodlumy7zele8ofevun.jpg",
    "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907698/tours/m4n5kbxo3o0jqikryhme.jpg",
    "https://res.cloudinary.com/dk4hfh4un/image/upload/v1780907694/tours/tgp9vs79kifu1lmiazxl.jpg"
];

mongoose.connect(process.env.DATABASE).then(async () => {
    console.log("Connected to DB, starting seed...");

    const categories = await Category.find({});
    
    let counter = 1;
    
    for (const cat of categories) {
        // Create 3 tours for each category
        for (let i = 1; i <= 3; i++) {
            const randomImage = images[Math.floor(Math.random() * images.length)];
            const tour = new Tour({
                name: `Tour Du Lịch ${cat.name} Tuyệt Đẹp - Hành Trình ${counter}`,
                category: cat._id.toString(),
                position: i,
                status: "active",
                avatar: randomImage,
                priceAdult: 8000000 + i * 1500000,
                priceNewAdult: 7000000 + i * 1000000,
                stockAdult: 15 + i * 5,
                time: "4 ngày 3 đêm",
                departureDate: new Date(Date.now() + i * 86400000 * 5),
                isFeatured: true,
                deleted: false
            });
            await tour.save();
            counter++;
        }
    }
    
    console.log("Seeding completed successfully!");
    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
