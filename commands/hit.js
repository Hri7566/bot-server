const Command = require('../bot/Command');

module.exports = new Command("hit", `Usage: PREFIXhit <item> <stuff>`, 2, (msg, bot) => {
    let good = false;
    let inv = bot.userdb.getInv(msg.p);
    let wep;
    let argcat1 = msg.argcat.substring(msg.args[1].length, msg.argcat.length - msg.args[1].length);
    let playerToHit = bot.userdb.getUserByNameOrId(argcat1);
    
    inv.forEach(i => {
        if (msg.args[1].toLowerCase() == i.name.toLowerCase()) {
            if (typeof(i.weapon) == "boolean") {
                if (i.weapon) {
                    good = true;
                    wep = i.name;
                }
            }
        }
    });

    if (good) {
        if (typeof(playerToHit) !== "undefined") {
            return `${msg.p.name} used ${wep} on ${playerToHit.name}!`;
        } else {
            return `${msg.p.name} used ${wep} on ${msg.argcat}!`;
        }
    } else {
        return `You can't do that!`;
    }
}, 3, true);