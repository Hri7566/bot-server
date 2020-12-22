const Command = require('../bot/Command');

module.exports = new Command(["randomname","rname","rn"], `Usage: PREFIXrandomname | Grab a random name from the user database`, 0, (msg, bot) => {
    let name = bot.userdb.users[Object.keys(bot.userdb.users)[Math.floor(Math.random()*Object.keys(bot.userdb.users).length)]].name;
    return name;
}, 1, true);
