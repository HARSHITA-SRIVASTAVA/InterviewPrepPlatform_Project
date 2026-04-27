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

        //get solved problems sorted by latest
        const solvedProblems = await Tracking.find({
        user: userId,
        status: "solved",
        }).sort({ updatedAt: -1 });

        //unique dates
        const uniqueDates = [
        ...new Set(
            solvedProblems.map((item) =>
            new Date(item.updatedAt).toDateString()
            )
        ),
        ];

        //CALCULATE STREAK
        let streak = 0;

        for (let i = 0; i < uniqueDates.length; i++) {
        const today = new Date();
        const checkDate = new Date(uniqueDates[i]);

        const diffDays = Math.floor(
            (today - checkDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === i) {
            streak++;
        } else {
            break;
        }
        }

        //return 
        res.status(200).json({
            success:true,
            data:{
                total,
                solved,
                unsolved,
                progress,
                streak,
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