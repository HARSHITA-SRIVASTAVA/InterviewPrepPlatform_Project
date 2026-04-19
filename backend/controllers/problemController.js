const Problem=require("../models/problemModel");  //import model

//Create problem funtion*
const createProblem=async(req,res)=>{
    try{
        const{title,difficulty,tags,link,platform,description}=req.body;

        const problem=await Problem.create({
            title,difficulty,tags,link,platform,description,
        });
        res.status(201).json({
            success:true,
            data:problem,
        });
    }
    catch(error){
        res.status(400).json({
            success:false,
            message:error.message,
        });
    }
};

//Get all Problems
const getAllProblems=async(req,res)=>{
    try{
        const problems=await Problem.find();  //find->get all

        res.status(200).json({
            success:true,
            count:problems.length,
            data:problems,
        });
    }
    catch(error){
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

//Get single problem
const getProblemById=async(req,res)=>{
    try{
        const problem=await Problem.findById(req.params.id);  //find->get all

        if(!problem){  ///avoid return null
            return res.status(404).json({
                success:false,
                message:"Problem not found",
            });
        }
        res.status(200).json({
            success:true,
            data:problem,
        });
    }
    catch(error){
        res.status(500).json({
        success: false,
        message: error.message,
        });
    }
};

//Update problem
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndUpdate(
      req.params.id,   //find target problem
      req.body,        //new data
      {
        new: true,          //default return old , so update to new
        runValidators: true,   //remember schema validators(enum,required)
      }
    );

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      data: problem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//delete Problem
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);

    if (!problem) {
      return res.status(404).json({
        success: false,
        message: "Problem not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Problem deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Mandatory always to export
module.exports = {
  createProblem,
  getAllProblems,
  getProblemById,
  updateProblem,
  deleteProblem,
};