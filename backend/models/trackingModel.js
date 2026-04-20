//relate user and problem : MANY - MANY relationship
//feilds: user , problems,status,notes , createdAt, updatedAt

//import moongoose
const mongoose = require("mongoose");

//schema
const trackingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",    //for .populate(" ")
      required: true,
    },

    problem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
      required: true,
    },

    status: {
      type: String,
      enum: ["solved", "unsolved"],
      default: "unsolved",
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

//prvent tracking duplicate problems using Compound Index
trackingSchema.index({ user: 1, problem: 1 }, { unique: true });

//create modle and export 
const Tracking = mongoose.model("Tracking", trackingSchema);
module.exports = Tracking;