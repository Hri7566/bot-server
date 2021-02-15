const ObjectGenerator = require('../objectgenerator');
const Command = require('../bot/Command');

var objectGenerator = new ObjectGenerator('../objectgenerator/objects.json');

module.exports = new Command(["randomobject", "robject", "robj"], `Usage: PREFIXrandomobject <multiple> | Generate random objects`, 0, msg => {
    if (msg.args[1]) {
        return objectGenerator.getRandomObject(msg.args[1]);
    } else {
        return objectGenerator.getRandomObject();
    }
}, 0, false);