const index = require('./index.js'); 
/*---------------------------------------------------------
function: testsend()
parameters: none
description: test sending notification payload to my device
-----------------------------------------------------------*/
const testsend = function() {
  var registrationToken = "dMVT9_n0QTS03rJv2baKiA:APA91bFe6TvUVulZyZDcQO_ygAZOiA5XqE43o72YHeI6Y6r5OF1qZUYLx-dPGMhjZoXzsviEceNCDUFXk91a2_xdqXU3Jq6yj8hvN56BYiLEIztXT9TqxMiD_3Z4LR7y9AK9rWkuyHAQ";
  var payload = {
    notification: {
      title: "This is a Notification",
      body: "This is the body of the notification message."
    }
  };
  var options = {
    priority: "high",
    timeToLive: 60 * 60 *24
  };
  index.admin.messaging().sendToDevice(registrationToken, payload, options)
    .then(function(response) {
      console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });  
}

/*---------------------------------------------------------
function: testsendtopic()
parameters: none
description: test sending notification payload to my a topic (my device) 
-----------------------------------------------------------*/
const testsendtopic = function() {
  var payload = {
    notification: {
      title: "Hearthstone test",
      body: "Testing send topic"
    }
  };

  var topic = "Hearthstone";

  index.admin.messaging().sendToTopic(topic, payload)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
}

/*---------------------------------------------------------
function: sendtopic
parameters: <String> topic, payload
description: sends payload to a given topic
-----------------------------------------------------------*/
const sendtopic = function(topic, payload) {

  index.admin.messaging().sendToTopic(topic, payload)
    .then(function(response) {
      console.log("Successfully sent message:", response);
    })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
}

module.exports = {
 testsend, testsendtopic, sendtopic
}

