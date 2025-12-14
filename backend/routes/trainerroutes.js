const express = require("express");
const router = express.Router();

const handleprotect = require("../middlewares/authmiddleware");
const handletraineronly = require("../middlewares/rolemiddleware");

router.get("/dashboard" ,handleprotect ,handletraineronly,(req, res) => {
        res.json({
            message: "Welcome to trainer dashboard"
        });
    }
);

module.exports = router;
