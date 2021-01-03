const Command = require('../Command');

module.exports = new Command(["claim","daily"], `Usage: PREFIXclaim | Claim your daily income`, 0, (msg, bot) => {
    return bot.userdb.claimDaily(msg.p)
}, 0, false);