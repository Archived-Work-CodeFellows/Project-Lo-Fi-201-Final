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

  var authStatus = document.getElementById('authStatus');
  var statusElement = document.createElement('h1');
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
      } else {
        statusText = document.createTextNode('You are session is not valid. Please sign in again.');
      }

      statusElement.appendChild(statusText);
      authStatus.appendChild(statusText);

    });
  } else {
    statusText = document.createTextNode('Your are not signed in.');

    statusElement.appendChild(statusText);
    authStatus.appendChild(statusText);
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

  location.reload();
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
      location.reload();      
    },

    onFailure: function (err) {
      alert(err);
    },

  });

};



document.getElementById('createNewUser').addEventListener('click', function () {

  var form = document.querySelector('#signUpForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;
  var givenNameValue = form.elements.givenName.value;

  newUser(emailAddressValue.toLowerCase(), passwordValue, givenNameValue);
  // newUser('813798@beb.com','P@ssw0rd','FDFD');

});



document.getElementById('authenticateUser').addEventListener('click', function () {

  var form = document.querySelector('#signInForm');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;

  authenticateUser(emailAddressValue.toLowerCase(), passwordValue);

});




// Sign Up Modal management
var signUpBtn = document.getElementById('signUp');
var signUpModal = document.getElementById('signUpModal');

var signInBtn = document.getElementById('signIn');
var signInModal = document.getElementById('signInModal');

signInBtn.onclick = function () {
  signInModal.style.display = 'block';
};

signUpBtn.onclick = function () {
  signUpModal.style.display = 'block';
};

// Modal close
var signInSpan = document.getElementById('signInClose');
var signUpSpan = document.getElementById('signUpClose');

signInSpan.onclick = function () {
  if (signInModal) {
    signInModal.style.display = 'none';
  }
};

signUpSpan.onclick = function () {
  if (signUpModal) {
    signUpModal.style.display = 'none';
  }
};

window.onclick = function (event) {
  if (event.target === signInModal) {
    signInModal.style.display = 'none';
  } else if (event.target === signUpModal) {
    signUpModal.style.display = 'none';
  }
};



document.getElementById('signOut').addEventListener('click', function () {

  signOut(emailAddress);

});