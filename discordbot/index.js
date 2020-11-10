const Discord = require('discord.js');

module.exports = class {
    constructor () {
        this.client = new Discord.Client();
        this.msg = {};
    }

    start() {
        this.client.login(process.env.TOKEN);
        console.log("Discord: Logged in");
        this.client.on('message', msg => {this.msg = msg});
    }

    chat(string) {
        this.msg.channel.send("\u034f"+string);
    }
}