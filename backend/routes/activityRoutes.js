const express = require("express");
const router = express.Router();

const { getActivityHistory } = require("../controllers/activityController");
const protect = require("../middleware/authMiddleware");


// /-> relative path (api/activity) , middleware->protect , controller->getActivityHistory
router.get("/", protect, getActivityHistory);

module.exports = router;