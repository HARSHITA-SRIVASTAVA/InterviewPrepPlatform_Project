//import express
const express = require("express");
const router = express.Router();

//import controllers
const {createProblem,getAllProblems,getProblemById,updateProblem,deleteProblem,} = require("../controllers/problemController");

//Create Routers

router.route("/")
  .post(createProblem)     // Create
  .get(getAllProblems);    // Get all //getAll

router.route("/:id")   //dynamic parameter -> id
    .get(getProblemById)  //get one problem
    .put(updateProblem)
    .delete(deleteProblem); //delete problem who's id is given

module.exports=router;