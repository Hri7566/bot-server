const Command = require('../bot/Command');

module.exports = new Command("bonk", `Usage: PREFIXbonk <stuff>`, 1, (msg, bot) => {
    let good = false;
    let inv = bot.userdb.getInv(msg.p);
    let playerToHit = bot.userdb.getUserByName(msg.argcat);
    
    inv.forEach(i => {
        if (i.name == "hammer") {
            good = true;
        }
    });

    if (good) {
        if (typeof(playerToHit) !== "undefined") {
            return `🔨 ${msg.p.name} bonked ${playerToHit.name}!`;
        } else {
            return `🔨 ${msg.p.name} bonked ${msg.argcat}!`;
        }
    } else {
        return `You need to buy a hammer!`;
    }
}, 0, false);