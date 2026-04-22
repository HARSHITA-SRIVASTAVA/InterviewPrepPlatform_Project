//imports
const Tracking=require("../models/trackingModel");
const Problem=require("../models/problemModel");

//for each tracking->check prob exist ->already tracked?return : track

const addTracking=async(req,res)=>{
    try{
        const userId=req.user._id;
        const { problemId }=req.body;  //{ }-> inside body find problemId:Destructuring Assignment

        //check problem exists
        const problemExists=await Problem.findById(problemId);
        if(!problemExists){
            return res.status(404).json({
                success:false,
                message:"Problem not found",
            });
        }

        //check duplicate tracking
        const existing = await Tracking.findOne({
            user:userId,
            problem:problemId,
        });

        if(existing){
            return res.status(400).json({
                sucess:false,
                message:"Already tracking this problem",
            });
        }

        const tracking=await Tracking.create({
            user:userId,
            problem:problemId,
        });

        res.status(201).json({
            success:true,
            data:tracking,
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
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
        })
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
        new: true,
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