const Command = require('../bot/Command');

module.exports = new Command("kiss", `Usage: PREFIXkiss <user> | Kiss someone`, 1, (msg, bot) => {
    let user = bot.userdb.getUserByNameOrId(msg.argcat);
    if (typeof(user) !== 'undefined') {
        return `${msg.p.name} kissed ${user.name}!`;
    } else {
        return `Could not find user.`;
    }
}, 0, false);
