import { GET_JOBS, JOBS_LOADING, CLEAR_CURRENT_JOBS } from "../actions/types";

const initialState = {
  jobs: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case JOBS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_JOBS:
      return {
        ...state,
        jobs: null
      };
    default:
      return state;
  }
}
