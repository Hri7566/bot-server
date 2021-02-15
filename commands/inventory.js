const Command = require('../bot/Command');

module.exports = new Command(["inventory","inv","i"], `Usage: PREFIXinventory | Look at your inventory`, 0, (msg, bot) => {
    let inv = bot.userdb.getInv(msg.p);
    let send = `${msg.p.name}'s inventory: `;
    if (typeof(inv) == "undefined") return `No inventory to check.`;
    inv.forEach(i => {
        send += ` ${i.name} (x${i.count}) | `;
    });
    send = send.trim();
    send = send.substring(0, send.length - 1);
    if (send.length <= msg.p.name.length + "'s inventory".length) {
        send += " is empty.";
    }
    return send;
}, 0, false);