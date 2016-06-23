var Observable = require("FuseJS/Observable");
var state = require("store/state.js")

function login() {
  state.setLoading(true)

    var status = 0;
    var response_ok = false;
    var requestObject = {
      email: email.value,
      password: password.value
    };

    setTimeout( function() {
      fetch('http://192.168.0.41:3333/login', {
          method: 'POST',
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify(requestObject)
      }).then(function(response) {
        // Do something with the response
        status = response.status;  // Get the HTTP status code
            if (status !== 200) {
              debug_log("Something went wrong, status code: " + status);
              errorMessage.value = "Something went wrong, status code: " + status;
              return response.json();
            } else {
              debug_log("\nWe got a response code: " + status);
              response_ok = response.ok; // Is response.status in the 200-range?
              return response.json();    // This returns a promise
            }
      }).then(function(responseObject) {
          // Do something with the result
          if (status === 200 && response_ok === true) {
            debug_log("\n\tLogin successful" + "\n\tname: " + responseObject.name + "\n\temail: " + responseObject.email + "\n\ttoken: " + responseObject.token);
            state.setLogin( { name: responseObject.name } )
            state.setLoading(false)
            router.goto("home",{})
          }
      }).catch(function(err) {
          // An error occured parsing Json
          debug_log("An error occured parsing Json: ", err);
      });
  }, 2500)
}

var name = Observable("");
var email = Observable("");
var password = Observable("");

var areCredentialsValid = Observable(function() {
  return email.value != "" && password.value != "";
});

var areCredentialsAuthorized = Observable(function() {
  return name.value != "" && email.value != "" && password.value != "";
});

function signup() {
  state.setLoading(true)

  var status = 0;
  var response_ok = false;
  var requestObject = {
    name: name.value,
    email: email.value,
    password: password.value
  };

    setTimeout( function() {
      fetch('http://192.168.0.41:3333/signup', {
          method: 'POST',
          headers: { "Content-Type":"application/json" },
          body: JSON.stringify(requestObject)
      }).then(function(response) {
        // Do something with the response
        status = response.status;  // Get the HTTP status code
            if (status !== 200) {
              debug_log("Something went wrong, status code: " + status);
              errorMessage.value = "Something went wrong, status code: " + status;
              return response.json();
            } else {
              debug_log("\nWe got a response code: " + status);
              response_ok = response.ok; // Is response.status in the 200-range?
              return response.json();    // This returns a promise
            }
      }).then(function(responseObject) {
          // Do something with the result
          if (status === 200 && response_ok === true) {
            debug_log("\n\tSignup successful");
            login();
          }
      }).catch(function(err) {
          // An error occured parsing Json
          debug_log("An error occured parsing Json: ", err);
      });
    }, 2500)
}

module.exports = {
  signup: signup,
  login: login,
  name: name,
  email: email,
  password: password,
  areCredentialsValid: areCredentialsValid,
  areCredentialsAuthorized: areCredentialsAuthorized
};