const Command = require('../Command');

module.exports = new Command("eat", `Usage: PREFIXeat <food> | Eat food from your inventory`, 1, (msg, bot) => {
    return bot.userdb.eatItem(msg.p, msg.args[1]);
}, 0, false);