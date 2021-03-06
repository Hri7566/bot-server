const Command = require('../bot/Command');

module.exports = new Command("names", `Usage: PREFIXnames <user> | Get the names of a user (doesn't work well for discord users)`, 1, (msg, bot) => {
    let user = bot.userdb.getUserByNameOrId(msg.argcat);
    if (typeof(user) !== "undefined") {
        let names = bot.userdb.getNames(user);
        return `${user.name}'s names: ${names.join(" | ")}`;
    } else {
        return `Could not find ${msg.argcat}.`;
    }
}, 0, false);