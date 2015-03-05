console.log('settings: ', Meteor.settings);

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
  bucket: Meteor.settings.bucket,

  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function (file) {
    // TODO - change directory
    //Store file into a directory by the user's username.
    var user = Meteor.users.findOne(this.userId);
    return user.username + "/" + file.name;
  }
});


