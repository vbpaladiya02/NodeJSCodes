const { connection } = require("./model");
const express = require("express");
const app = express();
const path = require("path");
const expressHandlebars = require("express-handlebars");
const methodOverride = require('method-override');

const PostsController = require("./controllers/routes"); 


app.use(express.static(__dirname + '/public/'));

app.engine("hbs",expressHandlebars({
    extname : "hbs",
    defaultLayout: false,
    layoutsDir : __dirname + "/views/"
    
    
}));

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