const Command = require('../Command');
const exec = require('util').promisify(require('child_process').exec);

module.exports = new Command('eval', `Usage: PREFIXeval <command> | Evaluate a linux command (buggy)`, 1, async (msg, bot) => {
    let ret = await exec(msg.argcat, (err, stdout, stderr) => {
        if (err) {
            return err;
        }
        return stdout;
    });
    console.log(ret);
    if (ret.length > 250) {
        ret = ret.substring(0, 250);
    }
    return ret;
}, 4, true);