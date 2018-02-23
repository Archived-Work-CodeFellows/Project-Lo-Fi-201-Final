'use strict';
debugger;

UserProfile.profileArray = [];
var currentUser = [];

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function UserProfile(uuid, firstName, lastName, emailAddress, unencryptedNeverDoThisOutsideOfClassPassword) {
  this.uuid = uuid;
  this.unencryptedNeverDoThisOutsideOfClassPassword = unencryptedNeverDoThisOutsideOfClassPassword;
  this.firstName = firstName;
  this.lastName = lastName;
  this.emailAddress = emailAddress;
  this.moodPreference = '';
  this.listeningHistory = [];

  this.billingAddr1;
  this.billingAddr2;
  this.billingCity;
  this.billingState;
  this.billingZip;
  this.phone;

  UserProfile.profileArray.push(this);
}

// function updateListeningHistory(uuid) {
//   // update the listeningHistory array for the user
// }

function displayContent() {
  document.getElementById('firstName').value = currentUser.firstName;
  document.getElementById('lastName').value = currentUser.lastName;
  document.getElementById('emailAddress').value = currentUser.emailAddress;
}


function noAccountOrBadPassword() {
  alert('You don\'t have an account.');
  location = 'index.html';
}


(function initUserProfiles() {
  if (localStorage.userProfiles) {
      // if some localStorage already exists, use it
    UserProfile.profileArray = (JSON.parse(localStorage.getItem('userProfiles')));
  } else {
      // otherwise make fake data and store it locally
    new UserProfile(uuid(),'Bryan', 'Brinson', 'bryan@beb.com',parseInt(123,10));
    new UserProfile(uuid(),'David', 'Johnson', 'a@b.com',parseInt(123,10));
    new UserProfile(uuid(),'Eric', 'Singleton', 'b@c.com',parseInt(123,10));

    var userProfilesString = JSON.stringify(UserProfile.profileArray);
    localStorage.setItem('userProfiles', userProfilesString);
  }

  // replace these prompts with a login form if not already logged in.
  var userEmail = prompt('Enter email address (a@b.com)');
  var password = parseInt(prompt('Enter a password'));

  // what i wouldn't do for a proper database select here...
  for (let i = 0; i < UserProfile.profileArray.length; i++ ) {
    if (UserProfile.profileArray[i].emailAddress.toLowerCase() === userEmail.toLowerCase()) {
      if (UserProfile.profileArray[i].unencryptedNeverDoThisOutsideOfClassPassword === password) {
        currentUser = UserProfile.profileArray[i];

        var userObjString = JSON.stringify(UserProfile.profileArray[i]);
        localStorage.setItem('currentUser', userObjString);
        displayContent();
        
      } else {
        // found account, but bad password.
        noAccountOrBadPassword();
        break;
      }
    }
  }
  alert ('bad username or password. try again.');

})();

// add click event for logout and delete the currentUser object from localstorage

