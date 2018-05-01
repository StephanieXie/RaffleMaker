var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);

function sendSms(phoneNumber, outgoingMessage) {
    var params = {
        to: phoneNumber,
        from: config.twilioNumber,
        body: outgoingMessage
    };

    return client.messages.create(params)
        .then(function(message) {
            console.log('Message sent to ' + message.to);
        })
        .catch(function(err) {
            console.error(err);
        });
}

module.exports = {
    sendSms
}
