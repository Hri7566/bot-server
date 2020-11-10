module.exports = class {
    constructor (file) {
        this.emoji = require(file);
    }

    getRandomEmoji(amount = 1) {
        let s = "";
        for (let i = 0; i < amount; i++) {
            s += this.emoji[Math.floor(Math.random()*this.emoji.length)].emoji;
        }
        return s;
    }
}