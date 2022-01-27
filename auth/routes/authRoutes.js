const express = require("express");
const router = express.Router();

const username = "vivek123";
const pass = "123123";

router.use(express.urlencoded({ extended: false }));

router.get("/login", (req, res) => {
  res.render("login", {});
});
// ok
router.post("/login", (req, res) => {
  if (req.body.username == username && req.body.pass == pass) {
    res.send("you are successfully authenticate");
  } else {
    res.send("invalid username or password");
  }
});

module.exports = router;
