const mongoose = require("mongoose");
const slugify = require('slugify')



var posts = new mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt:{
        type:String,
        default: new Date(Date.now()).toLocaleDateString()

    },
    slug: {
        type: String,
        required: true,
        unique: true
      }

});

posts.pre('validate', function(next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true })
    }
    next()
});
mongoose.model("Posts",posts);
