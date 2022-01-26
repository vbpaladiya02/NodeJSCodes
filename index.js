const { connection } = require("./model");
const express = require("express");
const app = express();
const path = require("path");
const { engine } = require("express-handlebars");
const methodOverride = require('method-override');

const PostsController = require("./controllers/routes"); 


app.use(express.static(__dirname + '/public/'));

app.engine(
  "handlebars",
  engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutDir: __dirname + "/views/",
  })
)


app.set("view engine","hbs");

app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'))

app.get("/",(req,res)=>{
    res.render("index",{})
})

app.use("/posts", PostsController)


app.listen("3000",()=>{
    console.log("server started!!!!!!");
});
