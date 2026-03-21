const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("views engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("client/pages/home.pug");
});
app.get("/tours", (req, res) => {
  res.render("client/pages/tour-list.pug", {
    pageTitle: "Danh sach",
  });
});

app.listen(port, () => {
  console.log(`Web đang cổng ${port}`);
});
