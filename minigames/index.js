Minigame = require('./minigame.js');

module.exports = class {
    constructor (bot) {
        this.bot = bot;
        this.games = [];

        this.addMinigame(new Minigame("gamble", 1, (msg) => {
            let amount = parseInt(msg.args[1]);
            if (typeof(amount) !== "number") return "Argument provided was not a number.";
            if (amount > this.bot.userdb.getBalance(msg.p)) {
                return "high";
            }
            let rand = Math.floor(Math.random() * amount);
            rand -= amount/2;
            rand = Math.round(rand);
            this.bot.userdb.getUser(msg.p).balance += parseInt(rand);
            this.bot.userdb.save();
            return {amount, rand};
        }));
    }

    getGameByName(name) {
        let game;
        this.games.forEach(g => {
            if (g.name == name) {
                game = g;
            }
        });
        return game;
    }

    addMinigame(game) {
        this.games.push(game);
    }

    setTarget(bot) {
        this.bot = bot;
    }
}