var config = require('config-lite')(__dirname);
var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

exports.User = mongolass.model('User', {
    name: {type: String, required: true},
    password: {type: String, required: true}
});

exports.User.index({ name: 1 }, { unique: true }).exec();

exports.Chat = mongolass.model('Chat', {
    name: {type: String, required: true},
    timestamp: {type: String, required: true},
    content: {type: String, required: true}
});

exports.Chat.index({name: 1, _id: -1}).exec();