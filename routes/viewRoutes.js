const express = require("express");
const viewController = require("../controllers/viewController");

const router = express.Router();

// Tours overview (home page)
router.get("/", viewController.getOverview);

module.exports = router;
