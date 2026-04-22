const Tracking = require("../models/trackingModel");

const getDashboardStats = async(req , res)=>{
    try{
        const userId=req.user._id;

        //cal total problems
        const total=await Tracking.countDocuments({user:userId});   //total tracked problems by user

        const solved=await Tracking.countDocuments({
            user:userId,
            status:"solved",
        });

        const unsolved=total-solved;

        //cal progess: check total!=0 -> divison by zero & round-> UI 
        const progress= (total==0 ? 0 : Math.round((solved/total)*100));

        //return 
        res.status(200).json({
            success:true,
            data:{
                total,
                solved,
                unsolved,
                progress,
            },
        });
    } 
    catch (error) {
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};