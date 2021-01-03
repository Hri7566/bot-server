const Command = require('../Command');
const ping = require('ping');

module.exports = new Command("ping", `Usage: PREFIXping <site> | Not functional`, 0, msg => {
    let host;
    let ret;
    msg.args[1] ? host = msg.args[1] : host = 'https://www.multiplayerpiano.com';

    ping.promise.probe(host, {
        timeout: 10
    }).then((res) => {
        ret = res;
    });

    return ret;
}, 2, false);
