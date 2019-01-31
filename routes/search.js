const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Profile Model
const Search = require("../models/Search");
// Load User Model
const User = require("../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Search Works" }));

// @route   POST api/profile
// @desc    Create a search
// @access  Public
router.post("/", (req, res) => {
  const searchFields = {};
  if (req.body.user) searchFields.user = req.body.user;
  if (req.body.location) searchFields.location = req.body.location;
  if (req.body.searchWords) searchFields.searchWords = req.body.searchWords;

  // Save Search
  new Search(searchFields).save();
});

module.exports = router;
