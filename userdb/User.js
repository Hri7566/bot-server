module.exports = class {
    constructor (name, _id, timestamp, color, rank) {
        this.name = name;
        this._id = _id;
        this.firstTime = timestamp;
        this.color = color;
        this.rank = rank;
        this.balance = 0;
        this.claimTime = 0;
        this.inventory = [];
    }
}