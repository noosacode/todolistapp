const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    username: {
      type: String,
      required: true,
    },

    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "jobs",
  },
);

module.exports = mongoose.model("Job", jobSchema);
