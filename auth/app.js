const express = require("express");
const path = require("path");
const app = express();
const { engine } = require("express-handlebars");
const apis = require("./routes/authRoutes");

app.use(express.urlencoded({ extended: false }));
app.engine(
  "handlebars",
  engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutDir: __dirname + "/views/",
  })
);
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home", {});
});

app.use("/api", apis);

app.listen("3000", () => {
  console.log("server started!!");
});
