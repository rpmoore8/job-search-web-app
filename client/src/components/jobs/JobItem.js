import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile, updateProfile } from "../../actions/profileActions";

class JobItem extends Component {
  constructor() {
    super();
    this.state = {
      showExtraSents: false,
      saved: false
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  saveJob = () => {
    const id = this.props.job.id;
    const p = this.props.profile.profile;
    p.savedJobs.push(id);
    this.setState({ saved: true });
    this.props.updateProfile(p);
  };

  deleteJob = () => {
    const id = this.props.job.id;
    const p = this.props.profile.profile;
    const i = p.savedJobs.indexOf(id);
    console.log(p.savedJobs);
    console.log(id);
    console.log(i);
    if (i >= 0) {
      p.savedJobs.splice(i, 1);
      console.log(p.savedJobs);
      this.setState({ saved: false });
      this.props.updateProfile(p);
    }
  };

  onClick = () => {
    this.setState({ showExtraSents: !this.state.showExtraSents });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { job } = this.props;
    const { showExtraSents, saved } = this.state;

    let savedJobs = null;
    let saveButton = null;
    if (isAuthenticated) {
      savedJobs = this.props.profile.profile.savedJobs;
      if (savedJobs.indexOf(this.props.job.id) >= 0 || saved) {
        saveButton = (
          <h3 className="card-header" onClick={this.deleteJob}>
            {" "}
            &#9733;
          </h3>
        );
      } else {
        saveButton = (
          <h3 className="card-header" onClick={this.saveJob}>
            {" "}
            &#9734;
          </h3>
        );
      }
    }

    // let displayedSents = null;
    // if (job.matchedSents) {
    //   displayedSents = job.matchedSents.map((sent, index) => (
    //     <li key={index} className="list-group-item">
    //       {sent}
    //     </li>
    //   ));
    // }

    // let hiddenSents = null;
    // if (showExtraSents && job.extraSents) {
    //   hiddenSents = job.extraSents.map(sent => (
    //     <li className="list-group-item">{sent}</li>
    //   ));
    // }

    // let searchWords = job.sortedWords.map((word, index) => {
    //   let match = (
    //     <li key={index}>
    //       {word[0]} - {Math.round(word[1] * 100)}%
    //     </li>
    //   );
    //   return match;
    // });

    return (
      <div className="card bg-light mb-3">
        {saveButton}
        <div className="card card-body">
          <h3 className="card-title">{job.name}</h3>
          <h4 className="card-subtitle text-muted">
            {job.company.toUpperCase()}
          </h4>
          {/* <h6 className="card-text text-muted">{searchWords}</h6> */}
          <a href={job.link}>View job at {job.source}</a>
          {/* <ul className="list-group">{displayedSents}</ul> */}
          {/* <ul className="list-group">{hiddenSents}</ul> */}
          {/* {showExtraSents ? null : (
            <button
              type="button"
              className="btn btn-info btn-sm"
              data-toggle="collapse"
              onClick={this.onClick}
            >
              Display More
            </button>
          )} */}
        </div>
      </div>
    );
  }
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateProfile }
)(JobItem);
