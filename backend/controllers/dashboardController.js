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
        ...new Set(     //remove duplicates
            solvedProblems.map((item) =>
            new Date(item.updatedAt).toDateString() //get dates in string
            )
        ),
        ];

        //CALCULATE STREAK
        let streak = 0;

        for (let i = 0; i < uniqueDates.length; i++) {
        const today = new Date();
        const checkDate = new Date(uniqueDates[i]);

        const diffDays = Math.floor(    //1000-> ms - s , 60 : sec- min , 60  : min -hr 24->hr -day
            (today - checkDate) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === i) {    
            streak++;
        } else {
            break;
        }
        }

        //get all tracked problem with details
        const tracked = await Tracking.find({user: userId}).populate("problem");

        //count unsolved by difficulty 
        //If many unsolved "Hard" → recommend more "Hard"
        const difficultyCount={
            Easy:0,
            Medium:0,
            Hard:0,
        };

        tracked.forEach((item) => {
            if(item.status=="unsolved"){
                //count difficulty : ex-> easy 1 .. , ?:prevent creash if problem missing (chaining)
                const diff = item.problem?.difficulty;  
                if(difficultyCount[diff]!=undefined)
                    difficultyCount[diff]++;  //unsolved count for each easy: / med: /hard
            }
        });

        //find wekest are to recommend
        let weakArea="None";
        let max=0;

        for(let key in difficultyCount){
            if(difficultyCount[key]>max){
                max=difficultyCount[key];
                weakArea=key;
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
                weakArea,    //recommendation
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