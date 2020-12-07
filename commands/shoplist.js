const Command = require('../bot/Command');

module.exports = new Command(["shoplist","shop"], `Usage: PREFIXshoplist`, 0, (msg, bot) => {
    let str = "Shop:";
    let items = bot.userdb.getShopList();
    items.forEach(i => {
        str += ` ${i.name} (${bot.userdb.balanceFormat(i.price)}) | `;
    });
    str = str.trim();
    str = str.substring(0, str.length-1);
    return str;
}, 0, false);