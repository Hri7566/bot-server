console.log("┌────────────────────────────────────────────┐");
console.log("│ooooooooo   oooooooo     .ooo       .ooo    │");
console.log(`│d"""""""8'  dP"""""""   .88'       .88'     │`);
console.log("│      .8'  d88888b.    d88'       d88'      │");
console.log(`│     .8'       \`Y88b  d888P"Ybo. d888P"Ybo. │`);
console.log("│    .8'          ]88  Y88[   ]88 Y88[   ]88 │");
console.log("│   .8'     o.   .88P  `Y88   88P `Y88   88P │");
console.log("│  .8'      `8bd88P'    `88bod8'   `88bod8'  │");
console.log("└────────────────────────────────────────────┘")

const { exec, spawn } = require('child_process');

global.exec = exec;
global.spawn = spawn;
global.http = require('http');
global.cp = require("child_process");

require('dotenv').config();

const fs = require('fs');
const readline = require('readline');

/**
 * Declarations
 */

var rl = readline.createInterface({input: process.stdin, output: process.stdout, terminal: false});

mppclients = [];

const Bot = require('./bot');
const bot = new Bot();

const Ranks = require('./ranks');
bot.ranks = new Ranks();

const UserDB = require('./userdb');
bot.userdb = new UserDB();

global.MPPBot = require('./mppbot');
mppbot = new MPPBot("wss://www.multiplayerpiano.com:443", bot, "RP Room");
hmppbot = new MPPBot('wss://hri7566.info:2050', bot, "HMPP");

const DBot = require('./discordbot');
const dbot = new DBot(bot);

const Website = require('./website');
const website = new Website();

const Emoji = require('./Emoji');
const emoji = new Emoji('./emoji.json');

const Minigames = require('./minigames');
bot.minigames = new Minigames(bot);

website.start();
dbot.start();

/**
 * Startup magic
 */

try {
    let files = fs.readdirSync(__dirname+"/commands");
    files.forEach(file => {
        if (!file.endsWith('.js') && !file.endsWith('.ts')) return;
        let command = require("./commands/"+file);
        bot.commandRegistry.registerCommandObj(command);
    });
} catch (err) {
    if (err) {
        console.error(err);
    }
}

/**
 * MPP Listener
 */

mppbot.connect("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
mppbot.listen();

hmppbot.connect("lobby");
hmppbot.listen();

/**
 * Readline listener
 */

rl.on('line', input => {
    msg = {
        a: input,
        p: mppbot.client.getOwnParticipant(),
        rank: {
            id: 4,
            name: "Owner"
        }
    };
    msg.args = msg.a.split(' ');
    bot.prefixes.forEach(async prefix => {
        if (msg.args[0].startsWith(prefix)) {
            msg.cmd = msg.args[0].split(prefix).slice(0, 2).join("").trim();
            msg.argcat = msg.a.substring(msg.cmd.length + 1 + 2).trim();
            let out = await bot.runCommand(bot.findCommand(msg.cmd), msg);
            if (typeof(out) === "undefined") return;
            if (typeof(out) === typeof(undefined)) return;
            console.log(out);
        }
    });
});

/**
 * Discord listener
 */

dbot.listen();

/**
 * Website & Websocket listener
 */

website.callback = (msg) => {
    msg.args = msg.a.split(' ');
    msg.rank = bot.userdb.getRank(msg.p);
    bot.prefixes.forEach(prefix => {
        if (msg.args[0].startsWith(prefix)) {
            msg.cmd = msg.args[0].split(prefix).slice(0, 2).join("").trim();
            msg.argcat = msg.a.substring(msg.cmd.length + 1).trim();
            m = {
                rank: {
                    id: 4,
                    name: "Owner"
                },
                p: {
                    name: "7566",
                    _id: msg.p._id,
                    color: "#000000"
                },
                a: bot.runCommand(bot.findCommand(msg.cmd), msg)
            };
            website.send(m);
        }
    });
};

/**
 * Register extra commands
 */

/**
 * Start
 */

bot.start();