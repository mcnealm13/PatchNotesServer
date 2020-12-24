//Outside Modules
var admin = require("firebase-admin");
var serviceAccount = require("/Users/matthewmcneal/Documents/PatchNotesServer/patchnotes-3c4dd-firebase-adminsdk-73rqy-6ddf7dc9a0.json");
var sys = require("util");
var schedule = require('node-schedule');
const driver = require('selenium-webdriver');

//Files
var send = require('./send.js');
var Hearthstone = require('./Hearthstone.js');

//Export variables, not sure if this is proper node style
module.exports.driver = driver;
module.exports.admin = admin;
module.exports.By = driver.By;

console.log("Starting Server...1..2..3..");

//Initialize service account for FCM
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

//Scraper promises
var hspromise = Hearthstone.Hearthstone();
var bigpromise = Promise.all([hspromise]).then();

//All the scrapers are done
bigpromise.then((payloads) => {
  //TODO Determine if the payloads are in the database and already sent out!
  send.sendtopic('Hearthstone', payloads[0][1]);
  send.sendtopic('Hearthstone', payloads[0][0]);
})
.catch(errs => {
  console.log(errs);
});


//var j = schedule.scheduleJob('*/5 * * * *', function() { //every 5 mins
//    send.testsendtopic()
//});
