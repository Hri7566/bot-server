module.exports = class {
    constructor (bot, func) {
        this.bot = bot;
        this.listen = func;
    }
}