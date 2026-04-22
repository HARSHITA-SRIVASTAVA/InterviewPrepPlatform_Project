const mongoose = require("mongoose");

//schema creation
const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Problem title is required"], //prevent empty
      trim: true, //remove extra spaces
    },

    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: {
        values: ["Easy", "Medium", "Hard"],
        message: "Difficulty must be Easy, Medium, or Hard",
      },
    },

    tags: {
      type: [String],
      default: [],
    },

    link: {
      type: String,
      required: [true, "Problem link is required"],
    },

    platform: {
      type: String,
      default: "LeetCode",
    },

    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,  //auto add createdAt and updatedAt
  }
);
problemSchema.index({ title: 1, platform: 1 }, { unique: true });

//covert schema into model
const Problem = mongoose.model("Problem", problemSchema);
module.exports = Problem;