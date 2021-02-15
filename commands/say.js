const Command = require('../bot/Command');

module.exports = new Command('say', `Usage: PREFIXsay <string> | Make the bot say something`, 1, (msg, bot) => {
    return msg.argcat;
}, 3, false);