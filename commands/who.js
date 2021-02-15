const Command = require('../bot/Command');

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
        return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
       return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

module.exports = new Command(["who","whois"], `Usage: PREFIXwho <person> | Get info on someone`, 0, (msg, bot) => {
    let user = bot.userdb.getUser(msg.p);
    if (msg.args[1]) {
        user = bot.userdb.getUserByNameOrId(msg.argcat);
    }
    if (typeof(user) !== "undefined") {
        return `Name: ${user.name} | _id: ${user._id} | Color: ${user.color} | First seen: ${timeSince(user.firstTime)} ago`;
    } else {
        return `User not found.`;
    }
}, 0, false);