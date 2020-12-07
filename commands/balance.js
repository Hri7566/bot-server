const Command = require('../bot/Command');

module.exports = new Command(["balance", "bal", "money"], `Usage: PREFIXmoney`, 0, (msg, bot) => {
    return `${msg.p.name}, you have ${bot.userdb.getBalance(msg.p)}.`;
}, 0, false);