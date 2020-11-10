module.exports = class {
    constructor (cmd, usage, minargs, func, minrank, hidden) {
        switch (typeof(cmd)) {
            case "string":
                this.cmd = [cmd];
                break;
            default:
                this.cmd = cmd;
                break;
        }
        this.usage = usage;
        this.minargs = minargs;
        this.func = func;
        this.minrank = minrank;
        this.hidden = hidden;
    }
}