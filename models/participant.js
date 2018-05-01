var mongoose = require('mongoose');

var ParticipantSchema = new mongoose.Schema({
    phoneNumber: String,
    message: String
});

var Participant = mongoose.model('participants', ParticipantSchema);
module.exports = Participant;
