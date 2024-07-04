const moment = require('moment');

// messages.js
module.exports = function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
      };
  };