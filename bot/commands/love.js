const Command = require('../Command');

module.exports = new Command("love", `Usage: PREFIXlove <user> | Love someone!`, 1, (msg, bot) => {
    let user = bot.userdb.getUserByNameOrId(msg.argcat);
    if (typeof(user) !== 'undefined') {
        return `${msg.p.name} loves ${user.name}!`;
    } else {
        return `Could not find user.`;
    }
}, 0, false);
