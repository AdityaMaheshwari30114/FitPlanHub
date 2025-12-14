const express = require("express");
const router = express.Router();

const handleprotect = require("../middlewares/authmiddleware");
const {
    handlefollowtrainer,
    handleunfollowtrainer
} = require("../controllers/followcontroller");

router.post("/:trainerId", handleprotect, handlefollowtrainer);
router.delete("/:trainerId", handleprotect, handleunfollowtrainer);

module.exports = router;
