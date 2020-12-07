const https = require('https');
const http = require('http');
const fs = require('fs');
const Express = require('express');
const bodyParser = require('body-parser');
const Pug = require('pug');
const WebSocket = require('ws');
const Crypto = require('crypto');
const { resolve } = require('path');
const { rejects } = require('assert');

module.exports = class {
    constructor () {
        this.app = Express().use(bodyParser.json());
        this.options = {
            key: fs.readFileSync("./private.key"),
            cert: fs.readFileSync("./certificate.crt"),
            ca: fs.readFileSync("./ca_bundle.crt")
        };
        this.clients = [];
        this.alg = 'aes-256-ctr';
        this.secretKey = "motherfucker";
        this.midi = "/midi";
    }

    start() {
        this.iv = Crypto.randomBytes(16);
        this.server = https.createServer(this.options, this.app).listen(8080);
        this.ws = new WebSocket.Server({server:this.server});
        this.app.set('view engine', "pug");
        this.app.use(Express.static('public'));
        this.app.get("/", (req, res, next) => {
            res.render('index', {
                title: "7566"
            });
            if (res.socket.destroyed) {
                res.end();
            }
        });
        this.app.get("/midi", (req, res, next) => {
            res.render('midi', {
                title: "7566 MIDI Control Panel"
            });
            if (res.socket.destroyed) {
                res.end();
            }
        });
        this.ws.on("connection", (ws, req) => {
            let _id = this.encrypt(req.connection.remoteAddress);
            this.send = (msg) => {
                msg = JSON.stringify(msg);
                ws.send(msg);
            }
            let msg = {
                p: {
                    name: "7566",
                    color: "send",
                    _id: _id.content
                }
            }
            ws.send(JSON.stringify(msg));
            msg = {
                p: {
                    name: "7566",
                    color: "#000000",
                    _id: _id.content
                },
                a: "Connected"
            }
            ws.send(JSON.stringify(msg));
            ws.on("message", (msg) => {
                try {
                    msg = JSON.parse(msg);
                    console.log(msg);
                    ws.send(JSON.stringify(msg));
                    if (msg.m = "midi") {
                        this.msgMidi(msg);
                        return;
                    }
                    this.callback(msg);
                } catch (err) {
                    console.error(err);
                }
            });
        });
    }

    callback(msg) {

    }

    msgMidi(msg) {
        if (msg.m == "midi") {
            if (typeof(msg.data) === 'undefined') return;
            if (msg.data.type == "file") {
                try {
                    this.checkmidihttp().then(() => {
                        let file = encodeURI(msg.data.file);
                        let port = encodeURI(msg.data.port);
                        let options = {
                            hostname: "localhost",
                            port: 35214,
                            path: `/?file=${file}&port=${port}`,
                            method: 'GET'
                        }

                        let req = http.request(options, res => {
                            res.on('data', d => {
                                console.log(d);
                            });
                        });
            
                        req.on('error', err => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        req.end();
                    });
                } catch (err) {
                    if (err) {
                        console.error(err);
                    }
                }
            } else if (msg.data.type == "killall") {
                try {
                    this.checkmidihttp().then(() => {
                        let file = encodeURI(msg.data.file);
                        let port = encodeURI(msg.data.port);
                        let options = {
                            hostname: "localhost",
                            port: 35214,
                            path: `/?killall=true`,
                            method: 'GET'
                        }

                        let req = http.request(options, res => {
                            res.on('data', d => {
                                console.log(d);
                            });
                        });
            
                        req.on('error', err => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        req.end();
                    });
                } catch (err) {
                    if (err) {
                        console.error(err);
                    }
                }
            }
        }
    }

    async checkmidihttp() {
        let options = {
            hostname: "localhost",
            port: 35214,
            path: `/?isOnline=true`,
            method: 'GET'
        }
        return new Promise((resolve, reject) => {
            let req = http.request(options, res => {
                res.on('data', d => {
                    let j = JSON.parse(d);
                    if (j.isOnline) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            });

            req.on('error', err => {
                if (err) {
                    reject(err);
                }
            });

            req.end();
        });
    }

    encrypt(text) {
        const cipher = Crypto.createCipheriv(this.alg, this.secretKey, this.iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

        return {
            iv: this.iv.toString('hex'),
            content: encrypted.toString('hex')
        }
    }

    decrypt(hash) {
        const decipher = Crypto.createDecipheriv(this.alg, this.secretKey, Buffer.from(hash.iv, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
        return decrypted.toString();
    }
}