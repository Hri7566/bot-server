const Client = require("mpp-client-xt");

module.exports = class {
    constructor (ws, bot, name) {
        name ? this.name = name : this.name = "MPP";
        this.client = new Client(ws);
        this.client.on('error', event => {
            this.log(this.name + " Client Error: " + event, true);
            setTimeout(() => {
                this.log("Attempting to reconnect...");
                this.client.start();
            }, 10000);
        });
        this.client.on('hi', () => {
            this.log("Connected");
        });
        this.bot = bot;
    }

    connect(room) {
        this.client.start();
        this.room = room;
        this.client.setChannel(room);
    }

    
    chat(string) {
        this.client.sendArray([{m:'a', message:`\u034f${string}`.split("amightywind").join(`amighty\u034fwind`)}]);
    }

    log(string, err) {
        let str = `${this.name}: ${string}`
        err ? console.error(str) : console.log(str);
    }

    listen() {
        this.client.on('a', msg => {
            msg.rank = this.bot.userdb.getRank(msg.p);
            msg.args = msg.a.split(' ');
            this.bot.prefixes.forEach(prefix => {
                if (msg.args[0].startsWith(prefix)) {
                    msg.cmd = msg.args[0].split(prefix).slice(0, 2).join("").trim();
                    msg.argcat = msg.a.substring(msg.cmd.length + 1 + 2).trim();
                    let out = this.bot.runCommand(this.bot.findCommand(msg.cmd), msg);
                    if (typeof(out) === "undefined") return;
                    if (typeof(out) === typeof(undefined)) return;
                    this.chat(out);
                }
            });
        })
    }
}