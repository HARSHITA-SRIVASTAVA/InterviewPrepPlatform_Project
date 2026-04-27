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

    //get recommended problems based on weakArea
    const recommended = await Problem.find({
      difficulty: weakArea,
    }).limit(3);

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