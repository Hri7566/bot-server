Minigame = require('./minigame.js');

module.exports = class {
    constructor (bot) {
        this.bot = bot;
        this.games = [];

        this.addMinigame(new Minigame("gamble", 1, (msg) => {
            let amount = parseInt(msg.args[1]);
            if (amount == NaN || amount == "NaN" || isNaN(amount)) return "NaN";
            amount = Math.round(amount);
            if (amount < 1) {
                return "low";
            }
            if (amount > this.bot.userdb.getUser(msg.p).balance) {
                return "high";
            }
            let rand = Math.floor(Math.random() * amount);
            rand -= amount/2;
            rand = Math.round(rand);
            this.bot.userdb.getUser(msg.p).balance += parseInt(rand);
            if (this.bot.userdb.getBalance(msg.p) < 0) {
                this.bot.userdb.getUser(msg.p).balance = 0;
            }
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