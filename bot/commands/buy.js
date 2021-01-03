const Command = require('../Command');

module.exports = new Command("buy", `Usage: PREFIXbuy <item> <amount> | Buy something from the shop`, 0, (msg, bot) => {
    if (typeof(msg.args[1]) !== "string") {
        return "First argument must be a valid item.";
    }
    if (typeof(parseInt(msg.args[2])) !== "number") {
        return "Second argument must be a number.";
    }
    return bot.userdb.buy(msg.p, msg.args[1], Math.floor(msg.args[2]));
}, 0, false);