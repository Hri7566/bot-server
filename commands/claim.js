const Command = require('../bot/Command');

module.exports = new Command(["claim","daily"], `Usage: PREFIXclaim`, 0, (msg, bot) => {
    return bot.userdb.claimDaily(msg.p)
}, 0, false);