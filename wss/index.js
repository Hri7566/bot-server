const sha1 = require('sha1');
const WebSocket = require('ws');

module.exports = class {
    constructor (port) {
        this.port = port;
        this.wss = null;
        this.default = {
            name: 'Noob',
            color: '#000000'
        }
    }

    start(bot) {
        this.wss = new WebSocket.Server({
            port: this.port,
        });
        let wss = this.wss;
        wss.on('connection', (ws, req) => {
            let id = sha1(req.headers['x-forwarded-for'] || req.connection.remoteAddress + process.env.SALT).toString().substring(0, 24);
            let gp = bot.userdb.getUserById(id);
            let p;
            if (typeof(gp) !== 'undefined') {
                let name = gp.name;
                if (typeof(name) == 'undefined') {
                    name = this.default.name;
                }
                let color = gp.color;
                if (typeof(color) == 'undefined') {
                    color = this.default.color;
                }
                p = {
                    _id: id,
                    name: name,
                    color: color
                }
            } else {
                p = {
                    _id: id,
                    name: this.default.name,
                    color: this.default.color
                }
            }
            ws.send(JSON.stringify(p), err => {
                console.error(err);
            });

            ws.on('message', async data => {
                let msg = JSON.stringify('msg');
                if (msg.p !== p) {
                    msg.p = p;
                }
                if (typeof(msg.m) == 'undefined') return;
                switch (msg.m) {
                    case "a":
                        if (typeof(msg.a) == 'undefined') return;
                        msg.args = msg.a.split(' ');
                        bot.prefixes.forEach(async prefix => {
                            if (msg.args[0].split(prefix)) {
                                msg.cmd = msg.args[0].split(prefix).splice(0, 2).join("").trim();
                                msg.argcat = msg.a.substring(msg.cmd.length + 1 + 2).trim();
                                let out = await bot.runCommand(bot.findCommand(msg.cmd), msg);
                                if (typeof(out) === "undefined") return;
                                if (typeof(out) === "undefined") return;
                                let s = {
                                    p: {
                                        name: "7566",
                                        color: "#000000",
                                        _id: "ead940199c7d9717e5149919"
                                    },
                                    a: "Connected"
                                }
                                ws.send(JSON.stringify(s));
                            }
                        });
                        break;
                }
            });
        });
    }

    log(str) {
        console.log('WebSocket Server: ' + str);
    }
    
    logError(str) {
        console.error('WebSocket Server Error: ' + str);
    }
}