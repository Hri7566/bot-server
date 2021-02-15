const Command = require('../bot/Command');

module.exports = new Command("sell", `Usage: PREFIXsell <item> <amount> | Sell items in your inventory`, 0, (msg, bot) => {
    if (typeof(msg.args[1]) !== "string") {
        return "First argument must be a valid item.";
    }
    if (typeof(parseInt(msg.args[2])) !== "number") {
        return "Second argument must be a number.";
    }
    return bot.userdb.sell(msg.p, msg.args[1], Math.floor(msg.args[2]));
}, 0, false);