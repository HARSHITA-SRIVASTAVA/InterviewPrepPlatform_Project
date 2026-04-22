const Tracking=require("../models/trackingModel");

//user tracking record->latest first(-1 /des) with problem info


const getActivityHistory=async(req,res)=>{
    try{
        const userId=req.user._id;

        const activities=await Tracking.find({user:userId})
        .populate("problem","title difficulty")   //add problem info
        .sort({updatedAt:-1})  //most recently updated at top
        .limit(10);   //gives only top 10 from all data -> prevent palyloads
       
        res.status(200).json({
            success:true,
            count:activities.length,
            data:activities,
        });
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};

module.exports = {
  getActivityHistory,
};