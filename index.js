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

const Bot = require('./bot');
const bot = new Bot();

const Ranks = require('./ranks');
bot.ranks = new Ranks();

const UserDB = require('./userdb');
bot.userdb = new UserDB();

const MPPBot = require('./mppbot');
mppbot = new MPPBot('wss://www.multiplayerpiano.com:443', bot);

const DBot = require('./discordbot');
const dbot = new DBot(bot);

const Website = require('./website');
const website = new Website();

const Emoji = require('./Emoji');
const emoji = new Emoji('./emoji.json');

const ObjectGenerator = require('./objectgenerator');
const objectGenerator = new ObjectGenerator('./objects.json');

const Minigames = require('./minigames');
bot.minigames = new Minigames(bot);

website.start();
dbot.start();

/**
 * MPP Listener
 */

mppbot.connect("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
mppbot.listen();

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
    bot.prefixes.forEach(prefix => {
        if (msg.args[0].startsWith(prefix)) {
            msg.cmd = msg.args[0].split(prefix).slice(0, 2).join("").trim();
            msg.argcat = msg.a.substring(msg.cmd.length + 1 + 2).trim();
            let out = bot.runCommand(bot.findCommand(msg.cmd), msg);
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

bot.commandRegistry.registerCommand("bonk", `Usage: PREFIXbonk <stuff>`, 1, msg => {
    let good = false;
    let inv = bot.userdb.getInv(msg.p);
    let playerToHit = bot.userdb.getUserByName(msg.argcat);
    
    inv.forEach(i => {
        if (i.name == "hammer") {
            good = true;
        }
    });

    if (typeof(playerToHit) !== "undefined") {
        return `🔨 ${msg.p.name} bonked ${playerToHit.name}!`;
    } else {
        if (good) {
            return `🔨 ${msg.p.name} bonked ${msg.argcat}!`;
        } else {
            return `You need to buy a hammer!`;
        }
    }
});

bot.commandRegistry.registerCommand("setalias", `Usage: PREFIXsetalias <original id> <alias id>`, 2, msg => {
    let p = bot.userdb.getUserById(msg.args[1]);
    let p2 = bot.userdb.getUserById(msg.args[2]);
    if (typeof(p) !== "undefined" && typeof(p2) !== "undefined") {
        bot.userdb.makeUserAlias(p._id, p2._id);
        return `${p._id} is now an alias of ${p2._id}.`;
    }
}, 2, false);

bot.commandRegistry.registerCommand("8ball", `Usage: PREFIX8ball <polar question>`, 1, msg => {
    let answers = [
        "As I see it, yes",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "It is certain",
        "It is decidedly so",
        "Most likely",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Outlook good",
        "Reply hazy, try again",
        "Signs point to yes",
        "Very doubtful",
        "Without a doubt",
        "Yes",
        "Yes - definitely",
        "You may rely on it"
    ]

    return `${answers[Math.floor(Math.random()*answers.length)]}, ${msg.p.name}.`;
});

bot.commandRegistry.registerCommand(["randomemoji", "remoji"], `Usage: PREFIXrandomemoji <multiple>`, 0, msg => {
    if (msg.args[1]) {
        return emoji.getRandomEmoji(msg.args[1]);
    } else {
        return emoji.getRandomEmoji();
    }
});

bot.commandRegistry.registerCommand(["claim","daily"], `Usage: PREFIXclaim`, 0, msg => {
    return bot.userdb.claimDaily(msg.p)
});

bot.commandRegistry.registerCommand(["inventory","inv","i"], `Usage: PREFIXinventory`, 0, msg => {
    let inv = bot.userdb.getInv(msg.p);
    let send = `${msg.p.name}'s inventory: `;
    inv.forEach(i => {
        send += ` ${i.name} (x${i.count}) | `;
    });
    send = send.trim();
    send = send.substring(0, send.length - 1);
    if (send.length <= msg.p.name.length + "'s inventory".length) {
        send += " is empty.";
    }
    return send;
});

bot.commandRegistry.registerCommand("buy", `Usage: PREFIXbuy <item> <amount>`, 0, msg => {
    if (typeof(msg.args[1]) !== "string") {
        return "First argument must be a valid item.";
    }
    if (typeof(parseInt(msg.args[2])) !== "number") {
        return "Second argument must be a number.";
    }
    return bot.userdb.buy(msg.p, msg.args[1], Math.floor(msg.args[2]));
});

bot.commandRegistry.registerCommand("sell", `Usage: PREFIXsell <item> <amount>`, 0, msg => {
    if (typeof(msg.args[1]) !== "string") {
        return "First argument must be a valid item.";
    }
    if (typeof(parseInt(msg.args[2])) !== "number") {
        return "Second argument must be a number.";
    }
    return bot.userdb.sell(msg.p, msg.args[1], Math.floor(msg.args[2]));
});

bot.commandRegistry.registerCommand(["shoplist","shop"], `Usage: PREFIXshoplist`, 0, msg => {
    let str = "Shop:";
    let items = bot.userdb.getShopList();
    items.forEach(i => {
        str += ` ${i.name} (${bot.userdb.balanceFormat(i.price)}) | `;
    });
    str = str.trim();
    str = str.substring(0, str.length-1);
    return str;
});

bot.commandRegistry.registerCommand("eat", `Usage: PREFIXeat <food>`, 0, msg => {
    return bot.userdb.eatItem(msg.p, msg.args[1]);
});

bot.commandRegistry.registerCommand(["randomobject", "robject", "robj"], `Usage: PREFIXrandomobject <multiple>`, 0, msg => {
    if (msg.args[1]) {
        return objectGenerator.getRandomObject(msg.args[1]);
    } else {
        return objectGenerator.getRandomObject();
    }
});

bot.commandRegistry.registerCommand(["balance", "bal", "money"], `Usage: PREFIXmoney`, 0, msg => {
    return `${msg.p.name}, you have ${bot.userdb.getBalance(msg.p)}.`;
});

bot.commandRegistry.registerCommand(["gamble"], `Usage: PREFIXgamble <gamble amount>`, 1, msg => {
    let arr = bot.minigames.getGameByName("gamble").run(msg);
    let wonstring = "won";
    if (arr.rand < 0) {
        wonstring = "lost";
        arr.rand = -arr.rand;
    }
    return `${msg.p.name} gambled ${bot.userdb.balanceFormat(arr.amount)} and ${wonstring} ${bot.userdb.balanceFormat(arr.rand)}. They now have ${bot.userdb.getBalance(msg.p)}.`;
});

bot.commandRegistry.registerCommand("play", `Usage: PREFIXplay <file>`, 1, msg => {
    let options = {
        hostname: 'localhost',
        port: 35214,
        path: `/?file=${msg.argcat}&port=1`,
        method: "GET"
    }

    let req = http.request(options, res => {
        res.on('data', d => {
            console.log(d);
        });
    });

    req.on('error', err => {
        return err;
    });

    req.end();

    return "";
}, 3, true);

bot.commandRegistry.registerCommand("stop", `Usage: PREFIXstop`, 0, msg => {
    let options = {
        hostname: 'localhost',
        port: 35214,
        path: `/?killall=true`,
        method: "GET"
    }

    let req = http.request(options, res => {
        res.on('data', d => {
            console.log(d);
        });
    });

    req.on('error', err => {
        return err;
    });

    req.end();

    return "";
}, 3, true);

/**
 * Start
 */

bot.start();