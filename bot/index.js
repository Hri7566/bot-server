module.exports = class {
    constructor () {
        this.Listener = require('./Listener');
        this.listeners = [];
        this.cmds = [];
        this.Command = require('./Command');
        this.Color = require('./Color');
        this.commandRegistry = new require("./commandRegistry.js")(this);
        this.prefixes = ["h!","^"];
    }

    start() {
        this.log("Ready for use");
    }

    log(str) {
        console.log(`Bot: ${str}`);
    }

    addListener(func) {
        this.listeners.push(new this.Listener(this, func));
    }

    runCommand(cmd, msg) {
        if (typeof(msg) === "undefined") return;
        if (typeof(cmd) === "undefined") return;
        if (msg.rank.id < cmd.minrank) return;
        if (msg.args.length - 1 < cmd.minargs) return this.getUsage(cmd);
        let ex = cmd.func(msg);
        if (ex.length > 0 && typeof(ex) !== "undefined") return ex;
    }

    getUsage(cmd) {
        if (typeof(cmd) === "undefined") {
            return `There is no help for that.`;
        }
        switch (typeof(cmd.cmd)) {
            case "string":
                if (typeof(cmd.usage) === "undefined" || cmd.usage == null) return `There is no help for ${cmd.cmd}.`;
                return cmd.usage.replace("PREFIX", this.prefixes[0]);
                break;
            case "object":
                if (typeof(cmd.usage) === "undefined" || cmd.usage == null) return `There is no help for ${cmd.cmd[0]}.`;
                return cmd.usage.replace("PREFIX", this.prefixes[0]);
                break;
        }
    }

    findCommand(cmdstring) {
        let cmdToReturn;
        this.cmds.forEach(cmd => {
            switch (typeof(cmd)) {
                case "string":
                    if (cmdstring == cmd.cmd) {
                        cmdToReturn = cmd;
                    }
                    break;
                default:
                    cmd.cmd.forEach(cm => {
                        if (cmdstring == cm) {
                            cmdToReturn = cmd;
                        }
                    });
                    break;
            }
        });
        if (cmdToReturn) return cmdToReturn;
    }
}