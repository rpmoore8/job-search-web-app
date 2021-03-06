const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  savedJobs: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
