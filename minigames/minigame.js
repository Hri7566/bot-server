module.exports = class {
    constructor (name, minargs, func) {
        this.name = name;
        this.minargs = minargs;
        this.func = func;
    }

    run(msg) {
        return this.func(msg);
    }
}