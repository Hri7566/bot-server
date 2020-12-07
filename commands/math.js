const Command = require('../bot/Command');
const math = require('mathjs');

module.exports = new Command(["math","m"], `Usage: PREFIXmath <eval string>`, 1, (msg, bot) => {
    let ret = "";
    try {
        ret = `${math.evaluate(msg.argcat)}`;
    } catch (err) {
        if (err) {
            ret = err;
        }
    }
    return ret;
}, 0, false);