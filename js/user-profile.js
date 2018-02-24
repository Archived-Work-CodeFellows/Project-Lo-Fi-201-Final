'use strict';
debugger;

var data = {
  UserPoolId: 'us-west-2_ewXR0S9DV',
  ClientId: '1utvpmt430d2d5c4839q9g70b6'
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
  });
}


var authStatus = document.getElementById('authStatus');
var statusText = document.createElement('h1');