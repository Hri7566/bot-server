const Command = require('../Command');
const Emoji = require('../../Emoji');

let emoji = new Emoji('./emoji.json');

module.exports = new Command(["randomemoji", "remoji"], `Usage: PREFIXrandomemoji <multiple> | Generate random emoji`, 0, msg => {
    if (msg.args[1]) {
        return emoji.getRandomEmoji(msg.args[1]);
    } else {
        return emoji.getRandomEmoji();
    }
}, 0, false);