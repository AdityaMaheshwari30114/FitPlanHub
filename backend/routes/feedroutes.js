const express = require("express");
const router = express.Router();

const handleprotect = require("../middlewares/authmiddleware");
const { handlegetfeed } = require("../controllers/feedcontroller");

router.get("/", handleprotect, handlegetfeed);

module.exports = router;
