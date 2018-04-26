module.exports = {
    sendSms: function(participantNumber, outgoingMessage) {
        var accountSid = process.env.TWILIO_ACCOUNT_SID; 
        var authToken = process.env.TWILIO_AUTH_TOKEN; 
        var twilioNumber = process.env.TWILIO_NUMBER;

        var client = require('twilio')(accountSid, authToken);

        var options = {
            to: participantNumber,
            from: twilioNumber,
            body: outgoingMessage,
        };

        return client.messages.create(options)
            .then(function(message) {
                console.log('Message sent to ' + message.to);
            })
            .catch(function(err) {
                console.error(err);
            });
    }
}
