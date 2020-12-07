const Command = require('../bot/Command');

module.exports = new Command(["gamble"], `Usage: PREFIXgamble <gamble amount>`, 1, (msg, bot) => {
    let arr = bot.minigames.getGameByName("gamble").run(msg);
    if (arr == "high") {
        return "You don't have that much money.";
    } else if (arr == "low") {
        return "You can't bet nothing.";
    } else if (arr == "NaN") {
        return "Not a number.";
    }
    let wonstring = "won";
    if (arr.rand < 0) {
        wonstring = "lost";
        arr.rand = -arr.rand;
    }
    return `${msg.p.name} gambled ${bot.userdb.balanceFormat(arr.amount)} and ${wonstring} ${bot.userdb.balanceFormat(arr.rand)}. They now have ${bot.userdb.getBalance(msg.p)}.`;
}, 0, false);