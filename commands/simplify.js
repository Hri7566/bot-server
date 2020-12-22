const Command = require('../bot/Command');
const math = require('mathjs');

module.exports = new Command(["simplify","simp"], `Usage: PREFIXsimplify <eval string>`, 1, (msg, bot) => {
    let ret = "";
    try {
        ret = `${math.simplify(msg.argcat)}`;
    } catch (err) {
        if (err) {
            ret = "Error";
        }
    }
    return ret;
}, 0, false);