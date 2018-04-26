var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var twilio = require('twilio');

var SmsModel = require('../models/smsModel'); // db model
var twilioClient = require('../twilioClient');

// GET default home route
router.get('/', function(req, res) {
  res.send('Raffle Maker home page');
});

// POST to /twilio-callback whenever our twilio app receives a message
router.post('/twilio-callback', function(req, res){
  var incomingMsg = req.body.Body; // text
  var incomingNum = req.body.From; // participant phone number

  // save to database
  var msgToSave = {
    status: incomingMsg,
    from: incomingNum,
  }
  var smsModel = new SmsModel(msgToSave)

  smsModel.save(function(err, data) {
    // set up Twilio response
    var MessagingResponse = twilio.twiml.MessagingResponse;
    var twilioResp = new MessagingResponse();

    if (err) {
      // (DEBUGGING) respond to user
      twilioResp.message('Oops! We couldn\'t save status --> ' + incomingMsg);
      // respond to twilio
      res.set('Content-Type', 'text/xml');
      res.send(twilioResp.toString());      
    }
    else {
      // (DEBUGGING) respond to user
      twilioResp.message('Successfully saved status! --> ' + incomingMsg);
      // respond to twilio
      res.set('Content-Type', 'text/xml');
      res.send(twilioResp.toString());     
    }
  });
});

// POST to /sendText whenever our twilio app sends a message
router.post('/sendText', function(req, res, next) {
  var participantPhoneNumber = '+1'+req.body.phoneNumber;
  var message = "i want dominos"; // hard-coded for now

  // if a participant's phone number appears multiple times in db, find the most recent entry
  SmsModel.findOne({from: participantPhoneNumber}, {}, {sort: {'_id': -1}})
    .then(function(participant) {
      twilioClient.sendSms(participantPhoneNumber, message);
    })
    .then(function() {
      res.send("Texting: " + participantPhoneNumber);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});

// POST to congratulations page
router.post('/generateWinner', function(req, res, next) {
  res.render('../public/congrats.html');

  SmsModel.find().distinct('from', function(err, phoneNumbers) {
    // 'phoneNumbers' is an array of all (unique) participant phone numbers stored in the database

    var randomNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
    var message = "CONGRATULATIONS!";

    console.log("Winner: " + randomNumber);

    // inform the winner that they won
    twilioClient.sendSms(randomNumber, message);
  });
});

module.exports = router;
