require('dotenv').load();
config = {};

config.accountSid = process.env.TWILIO_ACCOUNT_SID; 
config.authToken = process.env.TWILIO_AUTH_TOKEN; 
config.twilioNumber = process.env.TWILIO_NUMBER;

config.verificationCode = 'CSC220';

module.exports = config;
