const Command = require('../bot/Command');
const math = require('mathjs');

module.exports = new Command(["rationalize","rat"], `Usage: PREFIXrationalize <eval string> | Calculus: Rationalize`, 1, (msg, bot) => {
    let ret = "";
    try {
        ret = `${math.rationalize(msg.argcat)}`;
    } catch (err) {
        if (err) {
            ret = "Error";
        }
    }
    return ret;
}, 0, false);