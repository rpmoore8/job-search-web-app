import axios from "axios";

import { cities, categories, categoryNames } from "./searchParams";
import { GET_JOBS, JOBS_LOADING, CLEAR_CURRENT_JOBS } from "./types";

// Get jobs
export const getJobs = searchData => dispatch => {
  if (
    cities.indexOf(searchData.city) >= 0 &&
    categoryNames.indexOf(searchData.category)
  ) {
    let city = searchData.city;
    let category = categories[categoryNames.indexOf(searchData.category)];
    let address = "/jobs/" + city + "/" + category;
    console.log(address);

    dispatch(setJobsLoading());
    axios
      .get(address)
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
  } else {
    console.log("ERROR - BAD INPUT");
  }
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
