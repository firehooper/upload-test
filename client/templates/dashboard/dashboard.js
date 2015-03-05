GUploader =  new Slingshot.Upload("myFileUploads", {userId: Meteor.userId()});

Template.dashboard.rendered = function() {

  
};

Template.dashboard.events({
  'submit form': function(event){
    event.preventDefault();

    var error = GUploader.validate(event.target.upload.files[0]);
    if (error) {
      console.error(error);
      alert(error);
    } else {
      var uploadInput = event.target.upload;
      var nameInput = event.target.name;
      console.log('name', nameInput);
      GUploader.send(uploadInput.files[0], function (error, downloadUrl) {
	if(error){
	  console.log(error);
	  alert(error);
	} else {
	  var file = {'url': downloadUrl};
	  Meteor.users.update(Meteor.userId(), {$push: {"profile.files": file}});
	  // Items.insert(Meteor.userId(), {
	  //   'name': nameInput,
	  //   'url': GUploader.url(true),
	  //   'uploadDt': new Date(),
	  //   'userId': Meteor.userId()
	  // });
	}
      });
      return;
    }
  },

  'click .deleteAll': function() {
    Meteor.users.update(Meteor.userId(), {$set: {"profile.files": []}});
  }

});


Template.dashboard.helpers({
  'previewUrl': function () {
    //if we are uploading an image, pass true to download the image into cache
    //this will preload the image before using the remote image url.
    return GUploader.url(true);
  },

  'files': function() {
    //return _.each(Meteor.users.findOne({'_id': Meteor.userId()}).profile.files,
	   // function(file) {
	   //   console.log('file:');
	   //   console.log(file.url);
	   //   return file;
	   // });
    return Meteor.users.findOne({'_id': Meteor.userId()}).profile.files;
  },


  'progress': function() {
    return Math.round(GUploader.progress() * 100);
  }
});
