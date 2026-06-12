const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
    try {
        const tourController = require('./controllers/admin/tour.controller.js');
        const req = { query: {} };
        const res = {
            render: (view, data) => {
                console.log("RENDER:", view);
            }
        };
        await tourController.list(req, res);
        console.log("Success");
    } catch(err) {
        console.error("Error:", err);
    }
    process.exit(0);
});
