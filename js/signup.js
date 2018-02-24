'use strict';
debugger;


function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


var newUser = function (emailAddress, password, givenName) {

  AWSCognito.config.region = 'us-west-2';

  var poolData = {
    UserPoolId: 'us-west-2_ewXR0S9DV',
    ClientId: '1utvpmt430d2d5c4839q9g70b6'
  };

  var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);

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

document.getElementById('createNewUser').addEventListener('click', function() {

  var form = document.querySelector('form');

  var emailAddressValue = form.elements.emailAddress.value;
  var passwordValue = form.elements.password.value;
  var givenNameValue = form.elements.givenName.value;

  newUser(emailAddressValue.toLowerCase(), passwordValue, givenNameValue);
  // newUser('813798@beb.com','P@ssw0rd','FDFD');  

});

// Get the modal
var modal = document.getElementById('signUpModal');

// Get the button that opens the modal
var signUpBtn = document.getElementById('signUp');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal 
signUpBtn.onclick = function() {
  modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};