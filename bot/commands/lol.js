const Command = require('../Command');
const lol = require('lol');

module.exports = new Command("lol", `Usage: PREFIXlol | Something feels funny...`, 0, msg => {
    return lol();
}, 0, false);