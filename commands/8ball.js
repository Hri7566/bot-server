const Command = require('../bot/Command');

module.exports = new Command("8ball", `Usage: PREFIX8ball <polar question>`, 1, msg => {
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
}, 0, false);