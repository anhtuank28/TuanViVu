require("dotenv").config();
const mongoose = require("mongoose");
const SettingwebsiteInfo = require("./models/setting-website-model");

mongoose.connect(process.env.DATABASE).then(async () => {
  const info = await SettingwebsiteInfo.findOne({});
  console.log("DB Content:", info);
  process.exit(0);
}).catch(err => {
  console.error("DB Error:", err);
  process.exit(1);
});
