const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const router = express.Router();
const postsModel = mongoose.model("Posts");
    
router.use(express.urlencoded({ extended: false}));

router.get("/", async (req, res) => {

    var post = await postsModel.find({}).lean();
    res.render("home", { posts: post });
})

router.get("/newPosts", (req, res) => {
    res.render("newPosts");
})
router.post("/newPosts", (req, res) => {
    var posts = new postsModel();
    posts.title = req.body.title;
    posts.body = req.body.markdown;

    posts.save((err, doc) => {
        if (!err) {

            res.redirect("/posts/");

        }
        else {
            console.log(err);
            res.send("error occur");

        }

    })

})
router.get("/:id/edit", async (req, res) => {
     const posts = await postsModel.findById(req.params.id).lean();
    res.render('edit', { posts: posts })

})
router.put("/:id", async (req, res) => {

    
    try {
        var post = await postsModel.findById(req.params.id);
        post.title = req.body.title
        post.body = req.body.markdown
        post.createdAt = new Date(Date.now()).toLocaleDateString()
        post.save();
        res.redirect("/posts/");
        
    }
    catch
    {
        if (post == null) {
            
            res.redirect("/posts/")
        }
        else {
            res.send("data update not success fully");
            res.redirect("/posts/")
        }
    }


})
router.get("/:slug", async (req, res) => {
    const post2 = await postsModel.findOne({ slug: req.params.slug }).lean();

    res.render('show', { posts: post2 })
})

router.delete('/:id', async (req, res) => {
    await postsModel.findByIdAndDelete(req.params.id)
    res.redirect("/posts/")
  })
module.exports = router;