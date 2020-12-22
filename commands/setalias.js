const Command = require('../bot/Command');

module.exports = new Command("setalias", `Usage: PREFIXsetalias <original id> <alias id> | Set the alias of a user for data synchronization`, 2, (msg, bot) => {
    let p = bot.userdb.getUserById(msg.args[1]);
    let p2 = bot.userdb.getUserById(msg.args[2]);
    if (typeof(p) !== "undefined" && typeof(p2) !== "undefined") {
        bot.userdb.makeUserAlias(p._id, p2._id);
        return `${p._id} is now an alias of ${p2._id}.`;
    }
}, 2, false);