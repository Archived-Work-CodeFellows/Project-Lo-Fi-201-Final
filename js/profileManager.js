'use strict';
// debugger;

// Cognito init. 
// Requires aws-cognito-sdk.min.js and aws-sdk..min.js
AWSCognito.config.region = 'us-west-2';

var UserPoolId = 'us-west-2_ewXR0S9DV';
var ClientId = '1utvpmt430d2d5c4839q9g70b6';

var poolData = {
  UserPoolId: UserPoolId,
  ClientId: ClientId
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

// IIFE to get check current sign in status and configure menu items
(function isAuthenticated() {

  var data = {
    UserPoolId: UserPoolId,
    ClientId: ClientId
  };

  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser !== null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err);
        return;
      }
      console.log('session validity: ' + session.isValid());

      if (session.isValid()) {
        document.getElementById('signOut').style.display = 'inline';
        document.getElementById('myProfile').style.display = 'inline';
      } else {
        document.getElementById('signIn').style.display = 'inline';
        document.getElementById('signUp').style.display = 'inline';
      }
    });
  } else {
    document.getElementById('signIn').style.display = 'inline';
    document.getElementById('signUp').style.display = 'inline';
  }
})();



// A simple function to signout and reload the index page.
function signOut() {
  var data = {
    UserPoolId: UserPoolId,
    ClientId: ClientId
  };

  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser !== null) {
    cognitoUser.signOut();
    if (window.location.pathname.indexOf('/pages') > -1) {
      window.location.href = '../index.html'; //on a real server this should be ~/ or similar
    } else {
      window.location.reload();
    }
  } else {
    // this is an error. what are you doing?
  }
}

// Create a new user account in Cognito
var newUser = function (emailAddress, password, givenName) {
  var attributeList = [];

  var dataEmail = {
    Name: 'email',
    Value: emailAddress
  };
  var attributeEmail = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataEmail);
  attributeList.push(attributeEmail);

  var dataGivenName = {
    Name: 'given_name',
    Value: givenName
  };
  var attributeGivenName = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(dataGivenName);
  attributeList.push(attributeGivenName);

  userPool.signUp(emailAddress, password, attributeList, null, function (err, result) {
    if (err) {
      alert(err);
      return;
    } else if (result) {
      var cognitoUser = result.user;
      // prompt user to go to check email for account verification request.
      alert('Your user name is ' + cognitoUser.getUsername() + '\n\nPlease check your email and verify your account before attempting to sign-in. Thx!');
      window.location.reload();
    } else {
      alert('what the deuce?');
    }
  });
};

// Authenticate a user with Cognito
var authenticateUser = function (emailAddress, password) {

  var authenticationData = {
    Username: emailAddress,
    Password: password,
  };

  var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

  var userData = {
    Username: emailAddress,
    Pool: userPool
  };

  var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      console.log('access token + ' + result.getAccessToken().getJwtToken());
      console.log('idToken + ' + result.idToken.jwtToken);
      window.location.reload();
    },

    onFailure: function (err) {
      alert(err);
    },
  });
};



// Event Handlers
// Sign Up Button
document.getElementById('createNewUser').addEventListener('click', function (event) {
  event.preventDefault();
  var form = document.querySelector('#signUpForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;
  var givenNameValue = form.elements.givenName.value;

  // newUser('813798@BEB.COM','P@ssw0rd','FDFDFD');
  newUser(emailAddressValue.toLowerCase(), passwordValue, givenNameValue);
});


// Sign In Button
document.getElementById('authenticateUser').addEventListener('click', function () {
  event.preventDefault();
  var form = document.querySelector('#signInForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;

  authenticateUser(emailAddressValue.toLowerCase(), passwordValue);

});

// Sign Out Link
document.getElementById('signOut').addEventListener('click', function () {
  signOut();
});


// Sign In/Up Modal Events
document.getElementById('signUp').addEventListener('click', function () {
  document.getElementById('modalSignUp').style.width = '500px';
  document.getElementById('modalSignUp').style.height = '220px';
});

document.getElementById('signIn').addEventListener('click', function () {
  document.getElementById('modalSignIn').style.width = '500px';
  document.getElementById('modalSignIn').style.height = '170px';
});

document.getElementById('signInClose').addEventListener('click', function () {
  document.getElementById('modalSignIn').style.width = '0';
});

document.getElementById('signUpClose').addEventListener('click', function () {
  document.getElementById('modalSignUp').style.width = '0';
});

// My Profile Link
document.getElementById('myProfile').addEventListener('click', function () {
  if (window.location.pathname.indexOf('/index.html') > -1) {
    window.location.href = 'pages/user-profile.html';
  } else {
    window.location.href = 'user-profile.html';
  }
});