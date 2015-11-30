Talk = new Mongo.Collection('talk')
if (Meteor.isClient) {
  // counter starts at 0

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
  Template.body.helpers({
    talking: function () {
      return Talk.find({});
    }
  });
  Meteor.subscribe("allUsers");
  Template.body.helpers ({
    users: function () {
    return Meteor.users.find({}).fetch();
  }
  });
  Template.username.events({
    "click .talkto": function () {
      //DO THE SHIT WERE WE SELECT ALL THE STUFF
      // Good comment batman, that helped me the fuck out
    }
  })
  Template.body.events({
    "submit .new-task": function (event) {
      event.preventDefault();
      var text = event.target.text.value;
      Talk.insert({
        text: text,
        createdAt: new Date(),
        sentBy: Meteor.user(),
        showOn: new Date().toJSON().slice(0,10) +" " + new Date().toJSON().slice(11,16)
      });
      event.target.text.value = "";
    }});
  }



if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.publish("allUsers", function(){
        return Meteor.users.find({});
    });
  });
}
