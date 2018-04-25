var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var twilio = require('twilio');

var SmsModel = require('../models/smsModel'); // db model

// Default home route
router.get('/', function(req, res) {
  res.send('Raffle Maker home page');
});

// called whenever Twilio receives a message
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
  //console.log(smsModel);
});

// called whenever Twilio sends a message
router.post('/sendText', function(req, res, next) {
  var accountSid = process.env.TWILIO_ACCOUNT_SID; 
  var authToken = process.env.TWILIO_AUTH_TOKEN; 
  var twilioNumber = process.env.TWILIO_NUMBER;

  var client = twilio(accountSid, authToken);

  var participantPhoneNumber = '+1'+req.body.phoneNumber;
  var message = "i want dominos";

  SmsModel.findOne({from: participantPhoneNumber}, {}, {sort: {'_id': -1}})
    .then(function(participant) {
      var options = {
          to: participantPhoneNumber,
          from: twilioNumber,
          body: message,
      };

      client.messages.create(options)
          .then((message) => {
              console.log('Message sent to ' + message.to);
          });
    })
    .then(function() {
      res.send("Texting: " + participantPhoneNumber);
    })
    .catch(function(err) {
      res.status(500).send(err.message);
    });
});

module.exports = router;
