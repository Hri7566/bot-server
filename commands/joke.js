const Command = require('../bot/Command');
const Joke = require('awesome-dev-jokes');

module.exports = new Command("joke", `Usage: PREFIXjoke | Get a random joke`, 0, msg => {
    return Joke.getRandomJoke();
}, 0, true);