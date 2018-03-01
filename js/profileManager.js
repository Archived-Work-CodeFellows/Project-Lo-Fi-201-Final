'use strict';
debugger;

// Cognito init
AWSCognito.config.region = 'us-west-2';

var UserPoolId = 'us-west-2_ewXR0S9DV';
var ClientId = '1utvpmt430d2d5c4839q9g70b6';

var poolData = {
  UserPoolId: UserPoolId,
  ClientId: ClientId
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

(function isAuthenticated() {

  var data = {
    UserPoolId: UserPoolId,
    ClientId: ClientId
  };

  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  var authStatus = document.getElementById('music-studio');
  var statusElement = document.createElement('H1');
  var statusText;

  if (cognitoUser !== null) {
    cognitoUser.getSession(function (err, session) {
      if (err) {
        alert(err);
        return;
      }
      console.log('session validity: ' + session.isValid());

      if (session.isValid()) {
        statusText = document.createTextNode('Welcome back. You are currently signed in.');
        document.getElementById('signOut').style.display = 'inline';
        document.getElementById('myProfile').style.display = 'inline';
      } else {
        statusText = document.createTextNode('You are session is not valid. Please sign in again.');
        document.getElementById('signIn').style.display = 'inline';
        document.getElementById('signUp').style.display = 'inline';
      }



    });
  } else {
    // statusText = document.createTextNode('Your are not signed in.');
    // statusElement.appendChild(statusText);
    // authStatus.appendChild(statusElement);
    document.getElementById('signIn').style.display = 'inline';
    document.getElementById('signUp').style.display = 'inline';
  }

})();


function signOut() {

  var data = {
    UserPoolId: UserPoolId,
    ClientId: ClientId
  };

  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(data);
  var cognitoUser = userPool.getCurrentUser();

  if (cognitoUser !== null) {
    cognitoUser.signOut();
  }

  window.location.reload();
}


var newUser = function (emailAddress, password, givenName) {
  // uses values from cognitoInit()
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
      alert('user name is ' + cognitoUser.getUsername());
    } else {
      alert('what the deuce?');
    }
  });
};


var authenticateUser = function (emailAddress, password) {
  // uses values from cognitoInit()

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

      /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/
      console.log('idToken + ' + result.idToken.jwtToken);
      window.location.reload();
    },

    onFailure: function (err) {
      alert(err);
    },

  });

};

document.getElementById('createNewUser').addEventListener('click', function (event) {
  event.preventDefault();
  var form = document.querySelector('#signUpForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;
  var givenNameValue = form.elements.givenName.value;

  newUser(emailAddressValue.toLowerCase(), passwordValue, givenNameValue);
  // newUser('813798@beb.com','P@ssw0rd','FDFD');

});



document.getElementById('authenticateUser').addEventListener('click', function () {
  event.preventDefault();
  var form = document.querySelector('#signInForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;

  authenticateUser(emailAddressValue.toLowerCase(), passwordValue);

});

// Sign Up Modal management
document.getElementById('signUp').onclick = function () {
  document.getElementById('modalSignUp').style.width = '500px';
  document.getElementById('modalSignUp').style.height = '200px';
};

document.getElementById('signIn').onclick = function () {
  document.getElementById('modalSignIn').style.width = '500px';
  document.getElementById('modalSignIn').style.height = '150px';
};

document.getElementById('signInClose').onclick = function () {
  document.getElementById('modalSignIn').style.width = '0';
};

document.getElementById('signUpClose').onclick = function () {
  document.getElementById('modalSignUp').style.width = '0';
};

document.getElementById('signOut').addEventListener('click', function () {
  signOut();
});


document.getElementById('myProfile').addEventListener('click', function () {
  window.location.href = 'pages/user-profile.html';
});
