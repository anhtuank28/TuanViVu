const express = require("express");
const path = require("path");
const app = express();
const port = 3000;
const { log } = require("console");
require("dotenv").config();
const adminRoutes = require("./routes/admin/index.route");
const clientRoutes = require("./routes/client/index.route");
const variableConfig = require("./config/variable");

//ket noi database
const database = require("./config/database");
database.connect();
//thiet lap views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//thiet lap thu muc chua file tinh cua frontend
app.use(express.static(path.join(__dirname, "public")));

//tạo biến toàn cục trong file pug
app.locals.pathAdmin = variableConfig.pathAdmin;

//cho phép gửi data lên dạng json
app.use(express.json());

//thiet lap duong dan
app.use(`/${variableConfig.pathAdmin}`, adminRoutes);
app.use("/", clientRoutes);

app.listen(port, () => {
  console.log(`Web đang cổng ${port}`);
});
