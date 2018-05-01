var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var twilio = require('twilio');

var config = require('../config');
var Participant = require('../models/participant'); 
var twilioClient = require('../twilioClient');

// GET default home route
router.get('/', function(req, res) {
  res.send('Raffle Maker home page');
});

// POST to /twilio-callback whenever our twilio app receives a message
router.post('/twilio-callback', function(req, res) {
  var incomingNumber = req.body.From;
  var incomingVerificationCode = req.body.Body;

  // verify and add participant to db
  if (incomingVerificationCode === config.verificationCode) {
    Participant.findOne({phoneNumber: incomingNumber})
      .then(function(participant) {
        if (!participant) {
          Participant.create({phoneNumber: incomingNumber});
          twilioClient.sendSms(incomingNumber, "Your phone number has been added to the raffle.");
        }
      });
  } else {
    console.log('Verification code incorrect. Please try again.');
    twilioClient.sendSms(incomingNumber, "Verification code incorrect. Please try again.");
  }
});

// POST to congratulations page
router.post('/generateWinner', function(req, res) {
  res.render('../public/congrats.html');

  Participant.find().distinct('phoneNumber', function(err, phoneNumbers) {
    var randomNumber = phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];

    // inform the winner that they won
    twilioClient.sendSms(randomNumber, "Congratulations! Please come to the front to pick up your prize.");

    console.log("Winner: " + randomNumber);
  });
});

/*
// POST to /sendText whenever our twilio app sends a message
router.post('/sendText', function(req, res) {
  var participantPhoneNumber = '+1'+req.body.phoneNumber;
  var message = "i want dominos"; // hard-coded for now

  // if a participant's phone number appears multiple times in db, find the most recent entry
  twilioClient.sendSms(participantPhoneNumber, message)
    .then(function() {
      res.send("Texting: " + participantPhoneNumber);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});
*/

module.exports = router;
