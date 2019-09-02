var Chat = require("../lib/mongo").Chat;

module.exports = {
    create: function create(chat) {
      return Chat.create(chat).exec();
    },

    getAllChat: function getAllChat() {
      const query = {};
      return Chat.find(query).sort({_id: -1}).exec();
    }
  }