const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Load models
const Job = require("../models/Job");

// @route   GET jobs/test
// @desc    Tests jobs route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Jobs Works" }));

// @rout    GET jobs
// @desc    get jobs by city / category
// @access  Public
router.get("/:city/:category", (req, res) => {});

// @route   Post jobs
// @desc    Search jobs
// @access  Public
router.post("/", (req, res) => {
  Job.find({ city: req.body.city, category: req.body.category }).then(jobs => {
    const searchWords = req.body.searchWords.split(" ");
    const searchMap = {};

    if (jobs.length > 0) {
      let selectedJobs = [];
      for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < searchWords.length; j++) {
          searchMap[searchWords[j]] = 0;
        }
        const name = jobs[i].name.toLowerCase();
        let points = 0;
        for (let j = 0; j < searchWords.length; j++) {
          if (name.indexOf(searchWords[j]) >= 0) {
            points += 6;
            searchMap[searchWords[j]] += 6;
          }
          if (jobs[i].keyWords.indexOf(searchWords[j]) >= 0) {
            points += 3;
            searchMap[searchWords[j]] += 3;
          }
        }
        if (points >= 6) {
          let matchedSents = [];
          let extraSents = [];
          for (let k = 0; k < jobs[i].keySents.length; k++) {
            let matched = false;
            for (let j = 0; j < searchWords.length; j++) {
              if (jobs[i].keySents[k].indexOf(searchWords[j]) >= 0) {
                matched = true;
                points += 1;
                searchMap[searchWords[j]] += 1;
              }
            }
            if (matched) {
              matchedSents.push(jobs[i].keySents[k]);
            } else {
              extraSents.push(jobs[i].keySents[k]);
            }
          }

          let sortedWords = [];
          for (let k = 0; k < searchWords.length; k++) {
            if (searchMap[searchWords[k]] > 0) {
              sortedWords.push([
                searchWords[k],
                (searchMap[searchWords[k]] /= points)
              ]);
            }
          }

          points += sortedWords.length * 10;
          sortedWords.sort((a, b) => b[1] - a[1]);
          selectedJobs.push([
            jobs[i],
            points,
            sortedWords,
            matchedSents,
            extraSents
          ]);
        }
      }
      if (selectedJobs.length <= 0) {
        return res.status(200).json({ matches: "No matches found" });
      }
      selectedJobs.sort((a, b) => b[1] - a[1]);
      let highScore =
        selectedJobs[0][1] > searchWords.length * 5
          ? selectedJobs[0][1]
          : searchWords.length * 5;

      const sortedJobs = [];
      for (let j = 0; j < selectedJobs.length; j++) {
        const selectedJob = {
          id: selectedJobs[j][0]._id,
          source: selectedJobs[j][0].source,
          link: selectedJobs[j][0].link,
          sortedWords: selectedJobs[j][2],
          name: selectedJobs[j][0].name,
          company: selectedJobs[j][0].company,
          score: selectedJobs[j][1] / highScore,
          matchedSents: selectedJobs[j][3],
          extraSents: selectedJobs[j][4]
        };
        sortedJobs.push(selectedJob);
      }
      return res.status(200).json(sortedJobs);
    } else {
      return res.status(400).json({ jobs: "No jobs found" });
    }
  });
});

// @route   Post jobs/ids
// @desc    Search jobs based on ids
// @access  Public
router.post("/ids", (req, res) => {
  const objIds = req.body.ids.map(id => mongoose.Types.ObjectId(id));

  Job.find({ _id: { $in: objIds } }).then(jobs => {
    const searchWords = req.body.searchWords.split(" ");
    const searchMap = {};

    if (jobs.length > 0) {
      let selectedJobs = [];
      for (let i = 0; i < jobs.length; i++) {
        for (let j = 0; j < searchWords.length; j++) {
          searchMap[searchWords[j]] = 0;
        }
        const name = jobs[i].name.toLowerCase();
        let points = 0;
        for (let j = 0; j < searchWords.length; j++) {
          if (name.indexOf(searchWords[j]) >= 0) {
            points += 6;
            searchMap[searchWords[j]] += 6;
          }
          if (jobs[i].keyWords.indexOf(searchWords[j]) >= 0) {
            points += 3;
            searchMap[searchWords[j]] += 3;
          }
        }
        let matchedSents = [];
        let extraSents = [];
        for (let k = 0; k < jobs[i].keySents.length; k++) {
          let matched = false;
          for (let j = 0; j < searchWords.length; j++) {
            if (jobs[i].keySents[k].indexOf(searchWords[j]) >= 0) {
              matched = true;
              points += 1;
              searchMap[searchWords[j]] += 1;
            }
          }
          if (matched) {
            matchedSents.push(jobs[i].keySents[k]);
          } else {
            extraSents.push(jobs[i].keySents[k]);
          }
        }

        let sortedWords = [];
        for (let k = 0; k < searchWords.length; k++) {
          if (searchMap[searchWords[k]] > 0) {
            sortedWords.push([
              searchWords[k],
              (searchMap[searchWords[k]] /= points)
            ]);
          }
        }

        points += sortedWords.length * 10;
        sortedWords.sort((a, b) => b[1] - a[1]);
        selectedJobs.push([
          jobs[i],
          points,
          sortedWords,
          matchedSents,
          extraSents
        ]);
      }
      if (selectedJobs.length <= 0) {
        return res.status(200).json({ matches: "No matches found" });
      }
      selectedJobs.sort((a, b) => b[1] - a[1]);
      let highScore =
        selectedJobs[0][1] > searchWords.length * 5
          ? selectedJobs[0][1]
          : searchWords.length * 5;

      const sortedJobs = [];
      for (let j = 0; j < selectedJobs.length; j++) {
        const selectedJob = {
          id: selectedJobs[j][0]._id,
          source: selectedJobs[j][0].source,
          link: selectedJobs[j][0].link,
          sortedWords: selectedJobs[j][2],
          name: selectedJobs[j][0].name,
          company: selectedJobs[j][0].company,
          score: selectedJobs[j][1] / highScore,
          matchedSents: selectedJobs[j][3],
          extraSents: selectedJobs[j][4]
        };
        sortedJobs.push(selectedJob);
      }
      return res.status(200).json(sortedJobs);
    } else {
      return res.status(400).json({ jobs: "No jobs found" });
    }
  });
});

module.exports = router;
