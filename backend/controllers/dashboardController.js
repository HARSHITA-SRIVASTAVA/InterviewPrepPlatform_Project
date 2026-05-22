const Tracking = require("../models/trackingModel");
const Problem = require("../models/problemModel"); // ✅ FIXED

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get all tracked problems (single query optimization)
    const tracked = await Tracking.find({ user: userId }).populate("problem");

    const total = tracked.length;
    const solved = tracked.filter((t) => t.status === "solved").length;
    const unsolved = total - solved;

    const progress =total === 0 ? 0 : Math.round((solved / total) * 100);

    //get solved problems for STREAK CALCULATION 
    const solvedProblems = await Tracking.find({
        user: userId, status: "solved", 
    }).sort({ updatedAt: -1 });  //decreasing

    //daily goal tracker
    const todayDate = new Date();

    const solvedToday = solvedProblems.filter((problem) => {
    const solvedDate = new Date(problem.updatedAt);
      return (
        solvedDate.getDate() === todayDate.getDate() &&
        solvedDate.getMonth() === todayDate.getMonth() &&
        solvedDate.getFullYear() === todayDate.getFullYear()
      );
    }).length;

    const dailyGoal=3;
    const dailyProgress=Number(((solvedToday/dailyGoal)*100).toFixed(0));

    const uniqueDates = [
      ...new Set(
        solvedProblems.map((item) =>
          new Date(item.updatedAt).toDateString()    //get date in String form
        )
      ),
    ];

    //CALCULATE STREAK
    let streak = 0;
    const today = new Date();

    for (let i = 0; i < uniqueDates.length; i++) {
      const checkDate = new Date(uniqueDates[i]);

      const diffDays = Math.floor(
        //1000-> ms - s , 60 : sec- min , 60 : min -hr 24->hr -day
        (today - checkDate) / (1000 * 60 * 60 * 24)
      );

      if (diffDays === i) {
        streak++;
      } else {
        break;
      }
    }

    // Difficulty Count
    const difficultyCount = {
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    tracked.forEach((item) => {
      if (item.status === "unsolved") {
        const diff = item.problem?.difficulty;   
        //count difficulty : ex-> easy 1 .. , ?:prevent creash if problem missing (chaining)
        if (difficultyCount[diff] !== undefined) {
          difficultyCount[diff]++;   //unsolved count for each easy: / med: /hard
        }
      }
    });

    const solvedDifficulty = {   //for progress bar
      Easy: 0,
      Medium: 0,
      Hard: 0,
    };

    //XP system
    let xp=0;
    
    tracked.forEach((item) => {
      if (item.status === "solved") {
        const diff = item.problem?.difficulty;

        //xp
        if(diff=="Easy") xp+=10;
        if(diff=="Medium") xp+=20;
        if(diff=="Hard")xp+=40;
        if (solvedDifficulty[diff] !== undefined) {
          solvedDifficulty[diff]++;
        }
      }
    });

    //level System
      const level =Math.floor(xp/100)+1;
      const currentLevelXP=xp%100;
      const xpNeeded=100;

    //Achievment badges
    const achievements=[];
    if(solved>=1)
        achievements.push("🚀 Beginner");
    else if(solved>=5)
      achievements.push("🔥 Problem Solver");

    if(xp>=100)
        achievements.push("🏆 XP Master");
    if(streak>=7)
      achievements.push("⚡ Consistent Coder");

    //Find weakest area
    let weakArea = "None";
    let max = 0;

    for (let key in difficultyCount) {
      if (difficultyCount[key] > max) {
        max = difficultyCount[key];
        weakArea = key;
      }
    }

    //Edge cases
    if (total === 0) {
      weakArea = "Easy";    //user solved nothing

    } else if (unsolved === 0) {
      weakArea = "Hard";    //user solved all
    }

    //get tracking IDS
    // const tracked = await Tracking.find({ user: userId }).select("problem");
    const solvedTrackedIds = tracked.filter((t) => t.status === "solved").map((t) => t.problem?._id.toString());

    //get recommended problems
    let recommended=await Problem.find({
      _id:{$nin: solvedTrackedIds},   //exclude already tracked & solved
    })
    .limit(10);

      recommended.sort((a, b) => {
    const aTracked = tracked.some(t => t.problem._id.toString() === a._id.toString() && t.status === "unsolved");
    const bTracked = tracked.some(t => t.problem._id.toString() === b._id.toString() && t.status === "unsolved");

    return bTracked - aTracked;
  });

      //prioritize easy first if no ques solved
  const solvedCount=tracked.filter((t) => t.status === "solved").length;

    if (solvedCount === 0) {
      recommended = recommended.sort((a, b) => {
        if (a.difficulty === "Easy") return -1;
        if (b.difficulty === "Easy") return 1;
        return 0;
      });
    }

      // return top 3
    recommended = recommended.slice(0, 3);

  //for increasing loading speed
  const tracking = tracked.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Topic-wise solved count
const topicCount = {};

tracked.forEach((item) => {

  if (item.status === "solved") {
    const tags = item.problem?.tags || [];
    tags.forEach((tag) => {
      const splitTags = tag.split(",");
      splitTags.forEach((singleTag) => {
        const cleanTag = singleTag.trim();
        topicCount[cleanTag] =
          (topicCount[cleanTag] || 0) + 1;
      });
    });
  }
});

//weekly solved trend
const weeklyData={};
tracked.forEach((item)=>{
  if(item.status=="solved"){
   
    const days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat",];
    const date=days[
      new Date(item.updatedAt).getDay()
    ];
    
    weeklyData[date]=(weeklyData[date] || 0)+1;
  }
});
      

  // Return
  res.status(200).json({
    success: true,
    data: {
      total,
      solved,
      unsolved,
      progress,
      streak,
      weakArea,   //recommendation
      recommended, //represent recommended prob
      tracking,
      difficultyCount,   //chart
      solvedDifficulty,

      topicCount,    //analytics
      weeklyData,

      xp,         //xp
      level,
      currentLevelXP,
      xpNeeded,

      achievements,

      solvedToday,   //daily progree chart
      dailyGoal,
      dailyProgress,
    },
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};