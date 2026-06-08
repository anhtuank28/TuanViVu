const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const Tour = require('./models/tour.model');

const map = JSON.parse(fs.readFileSync('cloudinary_map.json', 'utf8'));

mongoose.connect(process.env.DATABASE).then(async () => {
    console.log("Connected to DB, updating tours...");

    const tours = await Tour.find({});
    
    let updatedCount = 0;
    for (const tour of tours) {
        if (tour.avatar && map[tour.avatar]) {
            tour.avatar = map[tour.avatar];
            await tour.save();
            updatedCount++;
        }
    }
    
    console.log(`Updated ${updatedCount} tours successfully!`);

    // Now update category.controller.js
    let controllerCode = fs.readFileSync('controllers/client/category.controller.js', 'utf8');
    for (const unsplashUrl in map) {
        // use split join to replace all occurrences if any
        controllerCode = controllerCode.split(unsplashUrl).join(map[unsplashUrl]);
    }
    fs.writeFileSync('controllers/client/category.controller.js', controllerCode);
    console.log("Updated category.controller.js!");

    // Also update seed-tours.js so future seeds use Cloudinary
    let seedCode = fs.readFileSync('seed-tours.js', 'utf8');
    for (const unsplashUrl in map) {
        seedCode = seedCode.split(unsplashUrl).join(map[unsplashUrl]);
    }
    fs.writeFileSync('seed-tours.js', seedCode);
    console.log("Updated seed-tours.js!");

    process.exit(0);
}).catch(e => {
    console.error(e);
    process.exit(1);
});
