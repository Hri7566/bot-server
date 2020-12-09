//! finish this soon

module.exports = (bot) => {
    return new CommandRegistry(bot);
}

const CommandRegistry = class {
    constructor (bot) {
        this.bot = bot;
        this.registerDefaultCommands(this.bot);
    }

    registerCommand(cmd, usage, minargs, func, minrank, hidden) {
        this.bot.cmds.push(new this.bot.Command(cmd, usage, minargs, func, minrank || 0, hidden || false));
    }

    registerCommandObj(obj) {
        this.bot.cmds.push(obj);
    }

    tempReg(callback, cmd, usage, minargs, func, minrank, hidden) {
        this.bot.cmds.push(new this.bot.Command(cmd, usage, minargs, func, minrank || 0, hidden || false));
        callback(cmd, usage, minargs, func, minrank, hidden);
        this.bot.cmds.pop();
    }

    registerDefaultCommands(bot) {
        this.registerCommand(["help", "h"], `Usage: PREFIXhelp <command>`, 0, msg => {
            let usedPrefix = msg.args[0].split(msg.cmd)[0];
            if (msg.args[1]) {
                return bot.getUsage(bot.findCommand(msg.args[1]), usedPrefix);
            }
            let tosend = "Commands: ";
            bot.cmds.forEach(cmd => {
                if (!cmd.hidden) {
                    if (msg.rank.id >= cmd.minrank) {
                        tosend += usedPrefix + cmd.cmd[0] + " | ";
                    }
                }
            });
            tosend = tosend.substring(0, tosend.length - 2);
            return tosend;
        });
    
        this.registerCommand("id", `Usage: PREFIXid`, 0, msg => {
            if (msg.args[1]) {
                let user = bot.userdb.findUser(msg.argcat);
                return `${user.name}'s ID: ${user._id} | ${user.name}'s color: ${bot.Color.getNearestColor(user.color)} [${user.color}]`;
            } else {
                return `Your ID: ${msg.p._id} | Your color: ${bot.Color.getNearestColor(msg.p.color)} [${msg.p.color}]`;
            }
        });
    
        this.registerCommand("rank", `Usage: PREFIXrank`, 0, msg => {
            return `Your rank: ${msg.rank.name} | Rank ID: ${msg.rank.id}`;
        });
    
        this.registerCommand("js", `Usage: PREFIXjs <eval>`, 0, msg => {
            if (msg.a.includes("process")) return `Process is disallowed.`;
            let i = msg.a.substring(msg.a.split(" ")[0].length + 1);
            if ((i.includes("process") == false) && (i.includes("stop") == false)) {
                try {
                    return "Console: " + eval(i.toString());
                } catch (e) {
                    return e + ".";
                }
            }
        }, 4, true);
    }
}