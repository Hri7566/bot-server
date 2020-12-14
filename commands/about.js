const Command = require('../bot/Command');
const pkg = require('../package.json');

module.exports = new Command(["about","a"], `Usage: PREFIXabout`, 1, (msg, bot) => {
    return pkg.description;
}, 0, false);