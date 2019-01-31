const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (typeof data.skills == String && Validator.isEmpty(data.skills)) {
    errors.skills = "Skills field handle is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
