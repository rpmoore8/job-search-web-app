const mongoose = require("mongoose");

// Create Schema
const JobSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  "job-id": {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  keywords: {
    type: Array,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  contents: {
    type: Array,
    required: true
  }
});

module.exports = Job = mongoose.model("jobs", JobSchema);
