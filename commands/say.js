const Command = require('../bot/Command');

module.exports = new Command('say', `Usage: PREFIXsay <string>`, 1, (msg, bot) => {
    return msg.argcat;
}, 3, false);