const Command = require('../bot/Command');
const catfacts = require('../catfacts.json');

module.exports = new Command(["catfact","cat"], `Usage: PREFIXcatfact`, 0, (msg, bot) => {
    return `${catfacts.all[Math.floor(Math.random()*catfacts.all.length)].text}`;
}, 0, false);