//imports
const Tracking=require("../models/trackingModel");
const Problem=require("../models/problemModel");

//for each tracking->check prob exist ->already tracked?return : track

const addTracking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { problemId, status } = req.body;

    //Check problem exists
    const problemExists = await Problem.findById(problemId);
    if (!problemExists) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    //Check duplicate
    const existing = await Tracking.findOne({
      user: userId,
      problem: problemId,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Already tracking this problem",
      });
    }

    //CREATE TRACKING 
    await Tracking.create({
      user: userId,
      problem: problemId,
      status: status || "unsolved",
    });

    // Fetch updated list
    const tracking = await Tracking.find({ user: userId })
      .populate("problem");

    // Return updated data
    res.status(201).json({
      success: true,
      data: tracking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get users Tracked Problem
const getUserTracking =async(req,res)=>{
    try{
      const userId=req.user._id;
        //user frild matches with id
        const tracking=await Tracking.find({user:userId}).populate("problem");  //populate()->add problem data also

      res.status(200).json({
        success:true,
        count:tracking.length,
        data:tracking,
      });
    }
    catch(error){
      res.status(500).json({
        success:false,
        message:error.message,
      });
    }
};

//update Tracking:-User can mark solved and add notes
const updateTracking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { trackingId } = req.params;

    const tracking = await Tracking.findOneAndUpdate(
      { _id: trackingId, user: userId },
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tracking,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


//delete TRACKING's
const deleteTracking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { trackingId } = req.params;

    const tracking = await Tracking.findOneAndDelete({
      _id: trackingId,
      user: userId,
    });

    if (!tracking) {
      return res.status(404).json({
        success: false,
        message: "Tracking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tracking removed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addTracking,
  getUserTracking,
  updateTracking,
  deleteTracking,
};