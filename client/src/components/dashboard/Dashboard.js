import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { connect } from "react-redux";
import JobItem from "../jobs/JobItem";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import { getJobsById, clearCurrentJobs } from "../../actions/jobActions";
import ProfileActions from "./ProfileActions";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      notLoading: true
    };
  }

  componentDidMount() {
    this.props.clearCurrentJobs();
    this.props.getCurrentProfile();
  }

  loadJobs(profile) {
    this.setState({ notLoading: false });
    const search = profile.skills.join(" ");
    const searchData = {
      ids: profile.savedJobs,
      searchWords: search.toLowerCase()
    };
    console.log(searchData);
    this.props.getJobsById(searchData);
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    const { jobs } = this.props.jobs;

    let jobItems;
    if (jobs == null || loading) {
      jobItems = null;
    } else {
      if (jobs.length > 0) {
        jobItems = jobs.map(job => <JobItem key={job._id} job={job} />);
      }
    }

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        if (
          this.state.notLoading &&
          jobs == null &&
          profile.savedJobs.length > 0
        ) {
          this.loadJobs(profile);
        }
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <ProfileActions />
            <div style={{ marginBottom: "60px" }}>
              <button
                onClick={this.onDeleteClick.bind(this)}
                className="btn btn-danger"
              >
                Delete My Account
              </button>
              {jobItems && <div className="jobItems"> {jobItems} </div>}
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet set up a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  jobs: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getJobsById: PropTypes.func.isRequired,
  clearCurrentJobs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount, getJobsById, clearCurrentJobs }
)(Dashboard);
