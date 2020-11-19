const Discord = require('discord.js');

module.exports = class {
    constructor (bot) {
        this.client = new Discord.Client();
        this.msg = {};
        this.bot = bot;
    }

    start() {
        this.client.login(process.env.TOKEN);
        console.log("Discord: Logged in");
        this.client.on('message', msg => {this.msg = msg});
    }

    chat(string) {
        this.msg.channel.send("\u034f"+string);
    }

    listen() {
        this.client.on('message', msg => {
            msg.a = msg.content;
            msg.p = {
                name: msg.author.username,
                _id: msg.author.id,
                color: msg.member.displayHexColor || "#000000"
            };
            msg.args = msg.a.split(' ');
            msg.rank = this.bot.userdb.getRank(msg.p);
            this.bot.prefixes.forEach(prefix => {
                if (msg.args[0].startsWith(prefix)) {
                    msg.cmd = msg.args[0].split(prefix).slice(0, 2).join("").trim();
                    msg.argcat = msg.a.substring(msg.cmd.length + 1 + 2 + 2).trim();
                    let out = this.bot.runCommand(this.bot.findCommand(msg.cmd), msg);
                    if (typeof(out) === "undefined") return;
                    if (typeof(out) === typeof(undefined)) return;
                    this.chat(out);
                }
            });
        })
    }
}