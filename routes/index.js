const express = require("express");

const router = express.Router();
router.use('/task', require('./task'))
router.use('/auth', require('./auth'))

module.exports = router;
