const Command = require('../bot/Command');
const pkg = require('../package.json');

module.exports = new Command(["about","a"], `Usage: PREFIXabout`, 0, (msg, bot) => {
    return pkg.description;
}, 0, false);