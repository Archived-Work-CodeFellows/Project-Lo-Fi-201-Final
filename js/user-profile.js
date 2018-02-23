'use strict';


UserProfile.profileArray = [];

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
  UserProfile.profileArray.push(this);
}

// function updateListeningHistory(uuid) {
//   // update the listeningHistory array for the user
// }

(function initUserProfiles() {
  if (localStorage.userProfiles) {
      // if some localStorage already exists, use it
    UserProfile.profileArray = (JSON.parse(localStorage.getItem('userProfiles')));
  } else {
      // otherwise make fake data
    new UserProfile(uuid(),'Bryan', 'Brinson', 'bryan@beb.com','123');
    new UserProfile(uuid(),'David', 'Johnson', 'a@b.com','123');
    new UserProfile(uuid(),'Eric', 'Singleton', 'a@b.com','123');
  }
})();

