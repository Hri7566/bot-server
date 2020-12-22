const Command = require('../bot/Command');
const math = require('mathjs');

module.exports = new Command(["math","m"], `Usage: PREFIXmath <eval string> | Advanced calculator (check https://mathjs.org/docs/expressions/parsing.html#evaluate)`, 1, (msg, bot) => {
    let ret = "";
    try {
        ret = `${math.evaluate(msg.argcat)}`;
    } catch (err) {
        if (err) {
            ret = "Error";
        }
    }
    return ret;
}, 0, false);