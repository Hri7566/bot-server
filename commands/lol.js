const Command = require('../bot/Command');
const lol = require('lol');

module.exports = new Command("lol", `Usage: PREFIXlol`, 0, msg => {
    return lol();
}, 0, false);