import axios from "axios";

import { cities, categories, categoryNames } from "./searchParams";
import { GET_JOBS, JOBS_LOADING, CLEAR_CURRENT_JOBS } from "./types";

// Get jobs
export const getJobs = searchData => dispatch => {
  let city = "";
  let category = "";
  if (searchData.city in cities && searchData.category in categoryNames) {
    city = searchData.city;
    category = categories[categoryNames.indexOf(searchData.category)];
  }

  dispatch(setJobsLoading());
  axios
    .post("/jobs", searchData)
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: null
      })
    );
};

// Get jobs from list of ids
export const getJobsById = searchData => dispatch => {
  console.log(searchData);
  dispatch(setJobsLoading());
  axios
    .post("/jobs/ids", searchData)
    .then(res => {
      dispatch({
        type: GET_JOBS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_JOBS,
        payload: null
      });
    });
};

// Jobs loading
export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING
  };
};

// Clear Jobs
export const clearCurrentJobs = () => {
  return {
    type: CLEAR_CURRENT_JOBS
  };
};
