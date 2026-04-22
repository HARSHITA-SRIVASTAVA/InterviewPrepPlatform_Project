const express=require("express");
const router=express.Router();

//import controllers -> logic
const {
  addTracking,getUserTracking,updateTracking,deleteTracking,
} = require("../controllers/trackingController");

//import Auth Middleware -> for protected routers
const protect = require("../middleware/authMiddleware");


router
  .route("/")
  .post(protect, addTracking)
  .get(protect, getUserTracking);

router
  .route("/:trackingId")
  .put(protect, updateTracking)
  .delete(protect, deleteTracking);

module.exports = router;
