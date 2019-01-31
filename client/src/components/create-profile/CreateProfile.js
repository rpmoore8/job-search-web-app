import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "",
      status: "",
      jobTitles: "",
      skills: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      jobTitles: this.state.jobTitles
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const statusOptions = [
      { label: "Select Status / Level", value: 0 },
      { label: "Entry Level", value: "entry" },
      { label: "Mid Level", value: "mid" },
      { label: "Senior Level", value: "senior" }
    ];

    const locationOptions = [
      { label: "Albuquerque, NM", value: "Albuquerque, NM" },
      { label: "Arlington, VA", value: "Arlington, VA" },
      { label: "Atlanta, GA", value: "Atlanta, GA" },
      { label: "Austin, TX", value: "Austin, TX" },
      { label: "Baltimore, MD", value: "Baltimore, MD" },
      { label: "Boston, MA", value: "Boston, MA" },
      { label: "Charlotte, NC", value: "Charlotte, NC" },
      { label: "Chicago, IL", value: "Chicago, IL" },
      { label: "Cleveland, OH", value: "Cleveland, OH" },
      { label: "Colorado Springs, CO", value: "Colorado Springs, CO" },
      { label: "Columbus, OH", value: "Columbus, OH" },
      { label: "Dallas, TX", value: "Dallas, TX" },
      { label: "Denver, CO", value: "Denver, CO" },
      { label: "Detroit, MI", value: "Detroit, MI" },
      { label: "El Paso, TX", value: "El Paso, TX" },
      { label: "Fort Worth, TX", value: "Fort Worth, TX" },
      { label: "Fresno, CA", value: "Fresno, CA" },
      { label: "Houston, TX", value: "Houston, TX" },
      { label: "Indianapolis, IN", value: "Indianapolis, IN" },
      { label: "Jacksonville, FL", value: "Jacksonville, FL" },
      { label: "Kansas City, MO", value: "Kansas City, MO" },
      { label: "Las Vegas, NV", value: "Las Vegas, NV" },
      { label: "Los Angeles, CA", value: "Los Angeles, CA" },
      { label: "Louisville, KY", value: "Louisville, KY" },
      { label: "Memphis, TN", value: "Memphis, TN" },
      { label: "Mesa, AZ", value: "Mesa, AZ" },
      { label: "Miami, FL", value: "Miami, FL" },
      { label: "Milwaukee, WI", value: "Milwaukee, WI" },
      { label: "Minneapolis, MN", value: "Minneapolis, MN" },
      { label: "Nashville, TN", value: "Nashville, TN" },
      { label: "New Orleans, LA", value: "New Orleans, LA" },
      { label: "New York City, NY", value: "New York City, NY" },
      { label: "Oakland, CA", value: "Oakland, CA" },
      { label: "Oklahoma City, OK", value: "Oklahoma City, OK" },
      { label: "Omaha, NE", value: "Omaha, NE" },
      { label: "Philadelphia, PA", value: "Philadelphia, PA" },
      { label: "Phoenix, AZ", value: "Phoenix, AZ" },
      { label: "Portland, OR", value: "Portland, OR" },
      { label: "Raleigh, NC", value: "Raleigh, NC" },
      { label: "Sacramento, CA", value: "Sacramento, CA" },
      { label: "San Antonio, TX", value: "San Antonio, TX" },
      { label: "San Diego, CA", value: "San Diego, CA" },
      { label: "San Francisco, CA", value: "San Francisco, CA" },
      { label: "San Jose, CA", value: "San Jose, CA" },
      { label: "Seattle, WA", value: "Seattle, WA" },
      { label: "Tucson, AZ", value: "Tucson, AZ" },
      { label: "Tulsa, OK", value: "Tulsa, OK" },
      { label: "Virginia Beach, VA", value: "Virginia Beach, VA" },
      { label: "Washington, DC", value: "Washington, DC" },
      { label: "Wichita, KS", value: "Wichita, KS" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Customize your searches by saving some information
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  options={statusOptions}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Give use an idea of where you are at in your career"
                />
                <SelectListGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  options={locationOptions}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Pick a city closest to your location"
                />

                <TextFieldGroup
                  placeholder="* Job Titles"
                  name="jobTitles"
                  value={this.state.jobTitles}
                  onChange={this.onChange}
                  error={errors.jobTitles}
                  info="Specific job titles you are pursuing."
                />

                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg. HTML, CSS, JavaScript, Python"
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
