//relate user and problem : MANY - MANY relationship
//feilds: user , problems,status,notes , createdAt, updatedAt

//import moongoose
const mongoose = require("mongoose");

const trackingSchema = new mongoose.Schema(
  {
    // User who is tracking the problem
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Problem being tracked
    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    // Solved / Unsolved
    status: {
      type: String,
      enum: ["solved", "unsolved"],
      default: "unsolved",
    },

    // Optional notes
    notes: {
      type: String,
      default: "",
    },

    // Revision system
    lastReviewed: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Tracking", trackingSchema);
    