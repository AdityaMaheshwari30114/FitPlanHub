const express = require("express");
const router = express.Router();

const handleprotect = require("../middlewares/authmiddleware");
const handletraineronly = require("../middlewares/rolemiddleware");
const { handlecreateplan, handleupdateplan, handledeleteplan, handlegetplans, handlegetplandetails
} = require("../controllers/plancontroller");

// public preview list
router.get("/", handlegetplans);

// get single plan (preview based on subscription)
router.get(
    "/:id",
    handleprotect,
    handlegetplandetails
);

router.post(
    "/",
    handleprotect,
    handletraineronly,
    handlecreateplan
);

// update plan
router.put(
    "/:id",
    handleprotect,
    handletraineronly,
    handleupdateplan
);

// delete plan
router.delete(
    "/:id",
    handleprotect,
    handletraineronly,
    handledeleteplan
);



module.exports = router;
