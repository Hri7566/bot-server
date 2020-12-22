const Command = require('../bot/Command');
const colorString = require('color-string');

module.exports = new Command(["color","c"], `Usage: PREFIXcolor <color> | Check a color's name or get your own color`, 0, (msg, bot) => {
    if (!msg.args[1]) {
        return `${msg.p.name}, your color is ${bot.Color.getNearestColor(msg.p.color)} [${msg.p.color}].`
    } else {
        try {
            return `${msg.argcat} is ${bot.Color.getNearestColor(colorString.to.hex(colorString.get(msg.argcat).value))} [${colorString.to.hex(colorString.get(msg.argcat).value)}]`;
        } catch (err) {
            console.log(err);
            return `${msg.argcat} is not a valid color.`;
        }
    }
}, 0, false);