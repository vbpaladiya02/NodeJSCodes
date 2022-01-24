const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/myTaskDb",{useNewUrlParser : true,useUnifiedTopology: true,useCreateIndex: true}, (err)=>{
    if(!err){
        console.log("connection database success!!");
    }
    else{
        console.log("error occur connecting database!!");
    }
});

const posts = require("./posts.model");