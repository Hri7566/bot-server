const Command = require('../bot/Command');

module.exports = new Command("eat", `Usage: PREFIXeat <food>`, 1, (msg, bot) => {
    return bot.userdb.eatItem(msg.p, msg.args[1]);
}, 0, false);