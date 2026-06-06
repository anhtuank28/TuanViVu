require("dotenv").config();
const mongoose = require("mongoose");
const Tour = require("./models/tour.model");
mongoose.connect(process.env.DATABASE).then(async () => {
    const tours = await Tour.find({ deleted: false, status: "active", isFeatured: true }).sort({ position: "desc" }).limit(4);
    console.log("Count:", tours.length);
    console.log(tours.map(t => t.name));
    process.exit();
});
