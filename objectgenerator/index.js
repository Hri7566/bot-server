module.exports = class {
    constructor (file) {
        this.objects = require(file);
    }

    getRandomObject(amount = 1) {
        let s = "";
        for (let i = 0; i < amount; i++) {
            s += this.objects[Math.floor(Math.random()*this.objects.length)];
            if (i !== amount - 1) {
                s += ", ";
            }
        }
        return s;
    }
}