'use strict';

// Cognito init
AWSCognito.config.region = 'us-west-2';

var UserPoolId = 'us-west-2_ewXR0S9DV';
var ClientId = '1utvpmt430d2d5c4839q9g70b6';

var poolData = {
  UserPoolId: UserPoolId,
  ClientId: ClientId
};
var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
var cognitoUser = userPool.getCurrentUser();

if (cognitoUser !== null) {
  cognitoUser.getSession(function (err, session) {
    if (err) {
      alert(err);
      return;
    } else {
      document.getElementById('displayForValidUser').style.display = 'block';
    }
    // console.log('session validity: ' + session.isValid());
  });

  cognitoUser.getUserAttributes(function (err, result) {
    if (err) {
      alert(err);
      return;
    }

    for (let i = 0; i < result.length; i++) {
      console.log('attribute ' + result[i].getName() + ' has value ' + result[i].getValue());

      if (result[i].getName() === 'given_name') {
        document.getElementById('firstName').defaultValue = result[i].getValue();
      }

      if (result[i].getName() === 'email') {
        document.getElementById('emailAddress').defaultValue = result[i].getValue();
      }

    }
  });

} else {
  // user is not signed in
}

function updateUserObject(attributeName, attributeValue) {
  var attributeList = [];

  var attribute = {
    Name: attributeName,
    Value: attributeValue
  };

  var attributeObj = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attribute);
  attributeList.push(attributeObj);

  cognitoUser.updateAttributes(attributeList, function (err, result) {
    if (err) {
      alert(err);
      return;
    } else {
      console.log('call result: ' + result);
      // return a success value.
    }
  });
}


// Custom event handlers for this page
document.getElementById('myProfile').style.display = 'none';

document.getElementById('home').addEventListener('click', function () {
  window.location.href = '../index.html';
});

document.getElementById('artists').addEventListener('click', function () {
  window.location.href = 'artists.html';
});

document.getElementById('updateUserObjectButton').addEventListener('click', function () {
  event.preventDefault();
  var form = document.getElementById('updateAttributeForm');

  // TODO: check the return value. if both are success, tell the user. 
  updateUserObject('email', form.elements.emailAddress.value);
  updateUserObject('given_name', form.elements.firstName.value);

  alert('Successfully updated account.');  // only if true, though it hasn't failed yet.

});