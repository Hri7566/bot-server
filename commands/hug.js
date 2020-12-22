const Command = require('../bot/Command');

module.exports = new Command("hug", `Usage: PREFIXhug <user> | Hug someone`, 1, (msg, bot) => {
    let user = bot.userdb.getUserByNameOrId(msg.argcat);
    if (typeof(user) !== 'undefined') {
        return `${msg.p.name} hugged ${user.name}!`;
    } else {
        return `Could not find user.`;
    }
}, 0, false);
