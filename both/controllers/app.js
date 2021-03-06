AppController = RouteController.extend({
  layoutTemplate: 'appLayout'
});

AppController.events({
  'click [data-action=logout]' : function() {
    AccountsTemplates.logout();
  }
});

Slingshot.fileRestrictions("myFileUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

Parties = new Mongo.Collection("parties");

if (Meteor.isClient) {
  angular.module('socially',['angular-meteor']);
  angular.module("socially").controller(
    "PartiesListCtrl", 
    ['$scope', '$meteor',
     function($scope, $meteor){
       $scope.parties = $meteor.collection(Parties);
       $scope.remove = function(party){
	 $scope.parties.splice( $scope.parties.indexOf(party), 1 );
       };
       $scope.removeAll = function(){
	 $scope.parties.remove();
       };
     }]);
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Parties.find().count() === 0) {
      var parties = [
	{'name': 'Dubstep-Free Zone',
	 'description': 'Fast just got faster with Nexus S.'},
	{'name': 'All dubstep all the time',
	 'description': 'Get it on!'},
	{'name': 'Savage lounging',
	 'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < parties.length; i++)
	Parties.insert({name: parties[i].name, description: parties[i].description});
}
});
}
