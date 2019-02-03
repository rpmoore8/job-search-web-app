import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getJobs } from "../../actions/jobActions";
import JobItem from "../jobs/JobItem";
import Spinner from "../common/Spinner";
import { getCurrentProfile } from "../../actions/profileActions";
import { Link } from "react-router-dom";

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchWords: "",
      skills: [],
      useProfile: false,
      searching: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Set component fields state
      this.setState({
        city: profile.location
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    this.setState({ searching: true });

    let search;

    if (this.state.useProfile) {
      const profile = this.props.profile.profile;
      search = this.state.searchWords + profile.skills.join(" ");
    } else {
      search = this.state.searchWords;
      console.log(this.state.city + " - " + this.state.category);
    }

    const searchData = {
      searchWords: search.toLowerCase(),
      city: this.state.city,
      category: this.state.category
    };

    this.props.getJobs(searchData);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onClick = () => {
    this.setState({ useProfile: !this.state.useProfile });
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const { loading, jobs } = this.props.jobs;
    const { profile } = this.props.profile;

    let jobItems;
    if (jobs == null || loading) {
      jobItems = <Spinner />;
    } else {
      if (jobs.length > 0) {
        jobItems = jobs.map(j => {
          return <JobItem key={j.id} job={j} />;
        });
      } else {
        jobItems = <h4>No matches found. Try adding more keywords.</h4>;
      }
    }

    let useProfileSkillsButton;
    if (isAuthenticated && profile != null) {
      if (profile.skills != null) {
        useProfileSkillsButton = (
          <label className="form-check-label mr-2">
            <input
              onChange={this.onClick}
              type="checkbox"
              className="form-check-input form-check-input"
              name="useProfile"
              value={this.state.useProfile}
            />{" "}
            Search using profile skills
          </label>
        );
      } else {
        useProfileSkillsButton = (
          <Link className="btn btn-info btn-sm" to="/create-profile">
            Create profile for easy searches
          </Link>
        );
      }
    } else {
      useProfileSkillsButton = null;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <h1 className="display-4 text-center my-4">Search</h1>
            <p className="lead text-center">
              Search for jobs using titles, skills, and keywords{" "}
            </p>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="searchWords"
                  value={this.state.searchWords}
                  onChange={this.onChange}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">Select city</label>
                <select
                  className="form-control"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                >
                  <option>Albuquerque, NM</option>
                  <option>Arlington, VA</option>
                  <option>Atlanta, GA</option>
                  <option>Austin, TX</option>
                  <option>Baltimore, MD</option>
                  <option>Boston, MA</option>
                  <option>Charlotte, NC</option>
                  <option>Chicago, IL</option>
                  <option>Cleveland, OH</option>
                  <option>Colorado Springs, CO</option>
                  <option>Columbus, OH</option>
                  <option>Dallas, TX</option>
                  <option>Denver, CO</option>
                  <option>Detroit, MI</option>
                  <option>El Paso, TX</option>
                  <option>Fort Worth, TX</option>
                  <option>Fresno, CA</option>
                  <option>Houston, TX</option>
                  <option>Indianapolis, IN</option>
                  <option>Jacksonville, FL</option>
                  <option>Kansas City, MO</option>
                  <option>Las Vegas, NV</option>
                  <option>Los Angeles, CA</option>
                  <option>Louisville, KY</option>
                  <option>Memphis, TN</option>
                  <option>Mesa, AZ</option>
                  <option>Miami, FL</option>
                  <option>Milwaukee, WI</option>
                  <option>Minneapolis, MN</option>
                  <option>Nashville, TN</option>
                  <option>New Orleans, LA</option>
                  <option>New York City, NY</option>
                  <option>Oakland, CA</option>
                  <option>Oklahoma City, OK</option>
                  <option>Omaha, NE</option>
                  <option>Philadelphia, PA</option>
                  <option>Phoenix, AZ</option>
                  <option>Portland, OR</option>
                  <option>Raleigh, NC</option>
                  <option>Sacramento, CA</option>
                  <option>San Antonio, TX</option>
                  <option>San Diego, CA</option>
                  <option>San Francisco, CA</option>
                  <option>San Jose, CA</option>
                  <option>Seattle, WA</option>
                  <option>Tucson, AZ</option>
                  <option>Tulsa, OK</option>
                  <option>Virginia Beach, VA</option>
                  <option>Washington, DC</option>
                  <option>Wichita, KS</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="category">Select category</label>
                <select
                  className="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                >
                  <option>Accounting / Finance</option>
                  <option>Administration</option>
                  <option>Business / Operations / Strategy</option>
                  <option>Creative / Design</option>
                  <option>Customer Service / Retail</option>
                  <option>Data / Analytics</option>
                  <option>Editorial</option>
                  <option>Education</option>
                  <option>Engineering</option>
                  <option>Fundraising / Development</option>
                  <option>Health / Wellness / Fitness</option>
                  <option>Healthcare / Medicine</option>
                  <option>Human Resources / Recruiting</option>
                  <option>Information Technology / Software</option>
                  <option>Insurance / Claims</option>
                  <option>Legal</option>
                  <option>Management</option>
                  <option>Marketing / PR / Media</option>
                  <option>Sales</option>
                </select>
              </div>

              <div className="form-check">{useProfileSkillsButton}</div>
              <br />
              <button className="btn btn-info btn-block mt-4" type="submit">
                Submit
              </button>
            </form>
            {this.state.searching && (
              <div className="jobItems"> {jobItems} </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getJobs: PropTypes.func.isRequired,
  jobs: PropTypes.object.isRequired,
  skills: PropTypes.array
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  jobs: state.jobs,
  skills: state.skills
});

export default connect(
  mapStateToProps,
  { getJobs, getCurrentProfile }
)(Search);
