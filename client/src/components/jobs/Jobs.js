import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobActions";
import Spinner from "../common/Spinner";

class Jobs extends Component {
  componentDidMount() {
    this.props.getJobs();
  }

  render() {
    const { jobs, loading } = this.props.jobs;

    let jobsContent;

    if (jobs === null || loading) {
      jobsContent = <Spinner />;
    } else {
      jobsContent = <h1>jobs here</h1>;
    }

    return (
      <div className="Jobs">
        <div className="container">
          <div className="row">
            <div className="col md-12">
              <h1 className="display-4">Jobs</h1>
              {jobsContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Jobs.propTypes = {
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getJobs }
)(Jobs);
