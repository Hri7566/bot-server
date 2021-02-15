const Command = require('../bot/Command');
const math = require('mathjs');

module.exports = new Command(["derivative","deriv"], `Usage: PREFIXderivative <function> /// <var> | Calculus: Get the derivative of a function (use <var> to set the variable used)`, 1, (msg, bot) => {
    let ret = "";
    let argcats = msg.argcat.split('///');
    try {
        if (argcats[1]) {
            ret = `${math.derivative(argcats[0], argcats[1])}`;
        } else {
            ret = `Use '///' to split parameters.`;
        }
    } catch (err) {
        if (err) {
            ret = "Error";
        }
    }
    return ret;
}, 0, false);