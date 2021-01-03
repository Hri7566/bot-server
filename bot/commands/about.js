const Command = require('../Command');
const pkg = require('../../package.json');

module.exports = new Command(["about","a"], `Usage: PREFIXabout | About the bot`, 0, (msg, bot) => {
    return pkg.description;
}, 0, false);