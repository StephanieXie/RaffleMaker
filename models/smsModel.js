var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmsSchema = new Schema({
    status: String, // what is the current status
    from: String, // who is it from
    dateAdded : { type: Date, default: Date.now },
});

var SmsModel = mongoose.model('smsModel', SmsSchema);
module.exports = SmsModel;
