const express = require("express");
const router = express.Router();

const handleprotect = require("../middlewares/authmiddleware");
const { handlesubscribe } = require("../controllers/subscriptioncontroller");

router.post("/:planId", handleprotect, handlesubscribe);

module.exports = router;
