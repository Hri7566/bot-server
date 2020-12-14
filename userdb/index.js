const path = require('path');
const fs = require('fs');
const User = require('./User');
const Rank = require('./Rank');
const { userInfo } = require('os');

module.exports = class {
    constructor () {
        this.users = require('./users.json');
        this.shop = require('./shop.json');
        this.defaultUser = new User('Anonymous', '2ad783be5f1bd100739f6b55', Date.now(), "#555555");
        this.currencySymbol = "H$";
        this.currencyStyle = "`${symbol}${amt}`";
        this.claimAmount = 50;
        this.claimLength = 24 * 60 * 60 * 1000; //24 hours in ms
    }

    refresh() {
        this.users = require('./users.json');
        this.shop = require('./shop.json');
    }

    resetNaNBalances() {
        for (let id in Object.keys(this.users)) {
            let p = this.users[id];
            if (typeof(p) == "undefined") return;
            if (typeof(p.balance) == "undefined" || p.balance == null) {
                p.balance = 100;
            }
        };
        this.save();
    }

    save() {
        fs.writeFile(__dirname+'/users.json', JSON.stringify(this.users, null, 4), (err) => {if (err) {console.error(err)}});
    }

    createUser(p, rank) {
        this.users[p._id] = new User(p.name, p._id, Date.now(), p.color, new Rank(rank ? rank : "user"));
        this.save();
    }

    userExists(p) {
        return typeof(this.users[p._id]) === "object";
    }

    getUser(p) {
        if (!this.userExists(p)) {
            this.createUser(p);
        }
        if (typeof(this.users[p._id].alias) !== 'undefined') {
            return this.getAlias(p._id);
        }
        if (typeof(this.users[p._id].inventory) === 'undefined') {
            this.users[p._id].inventory = [];
        }
        if (this.users[p._id].name !== p.name) {
            this.users[p._id].name = p.name;
        }
        return this.users[p._id];
    }

    findUser(s) {
        let userToReturn;
        Object.keys(this.users).forEach(id => {
            let user = this.users[id];
            if (!user.name) return;
            if (!user._id) return;
            if (user.name.toLowerCase().includes(s.toLowerCase()) || user._id.toLowerCase().includes(s.toLowerCase())) {
                userToReturn = user;
            }
        });
        return userToReturn;
    }

    getAlias(id) {
        return this.users[this.users[id].alias];
    }

    makeUserAlias(id, id2) {
        this.users[id].alias = id2;
        this.save();
    }

    getBalance(p) {
        if (this.userExists(p)) {
            return this.balanceFormat(this.getUser(p).balance);
        } else {
            return this.balanceFormat(0);
        }
    }

    setBalance(p, s) {
        if (!(typeof(s) === "number")) return;
        if (!this.userExists(p)) {
            this.users[p._id] = new User(p.name, p._id, Date.now(), p.color);
        }
        this.getUser(p).balance = s;
        this.save();
    }

    getUserById(id) {
        return this.users[id];
    }

    getUserByName(name) {
        let userToReturn;
        Object.keys(this.users).forEach(id => {
            let user = this.users[id];
            if (!user.name) return;
            if (user.name.toLowerCase().includes(name.toLowerCase())) {
                userToReturn = user;
            }
        });
        return userToReturn;
    }

    getUserByNameOrId(str) {
        let userToReturn;
        Object.keys(this.users).forEach(id => {
            let user = this.users[id];
            if (!user.name) return;
            if (user.name.toLowerCase().includes(str.toLowerCase()) || user._id.toLowerCase().includes(str.toLowerCase())) {
                userToReturn = user;
            }
        });
        return userToReturn;
    }

    getRank(p) {
        return this.getUser(p).rank;
    }

    getNames(p) {
        let user = this.getUser(p);
        if (typeof(user.names) !== "undefined") {
            return user.names;
        } else {
            return [p.name];
        }
    }

    saveName(name, p) {
        let user = this.getUser(p);
        if (typeof(user.names) !== "undefined") {
            if (this.users[p._id].names.indexOf(name) !== -1) return;
            this.users[p._id].names.push(name);
        } else {
            if (p.name == name) {
                this.users[p._id].names = [name];
            } else {
                this.users[p._id].names = [p.name, name];
            }
        }
    }

    setRank(p, rankname) {
        this.getUser(p).rank = new Rank(rankname);
        this.save();
    }

    balanceFormat(b) {
        try {
            let amt = b;
            let symbol = this.currencySymbol;
            let parsed = eval(this.currencyStyle);
            return parsed;
        } catch (err) {
            if (err) {
                console.error(err);
                return "MISSINGNO.";
            }
        }
    }

    claimDaily(p) {
        let user = this.getUser(p);
        let t = Date.now();
        let claimAmount = this.claimAmount;
        if (typeof(user.claimTime) === "undefined") {
            user.claimTime = 0;
        }

        let timeleft = (user.claimTime + (this.claimLength)) - t;
        
        if (timeleft <= 0) {
            user.claimTime = Date.now();
            user.balance += claimAmount;
            this.save();
            return `${p.name} claimed ${this.balanceFormat(claimAmount)}. They now have ${this.balanceFormat(user.balance)}.`;
        } else {
            return `You can't claim until ${Math.round(timeleft/1000/60/60)} hours from now.`;
        }
    }

    getInv(p) {
        return this.getUser(p).inventory;
    }

    buy(p, i, count) {
        let user = this.getUser(p);
        let item = this.findShopItem(i);

        if (typeof(item) === "undefined") return "No such item";

        if (!count || count < 1) count = 1;

        if (user.balance >= item.price * count) {
            let res = false;
            user.balance -= item.price * count;
            let invitem = {
                name: item.name,
                count: count,
                sellprice: item.price,
                edible: item.edible
            }
            user.inventory.forEach(obj => {
                if (!res) {
                    if (obj.name == invitem.name) {
                        obj.count += invitem.count;
                        obj.sellprice = invitem.sellprice;
                        res = true;
                    }
                }
            });
            if (!res) {
                user.inventory.push(invitem);
            }
            this.save();
            return `${p.name} bought ${item.name} (x${count}) for ${this.balanceFormat(item.price * count)}.`;
        } else {
            return `Insufficient funds, transaction cancelled.`;
        }
    }

    sell(p, i, count) {
        let user = this.getUser(p);
        let item = this.findInvItem(p, i);

        if (typeof(item) === "undefined") return "No such item";

        if (!count || count < 1) count = 1;

        if (item.count >= count) {
            user.balance += item.sellprice * count;
            item.count -= count;
            this.invClearEmpty(p);
            this.save();
            return `${p.name} sold ${item.name} (x${count}) for ${this.balanceFormat(item.sellprice * count)}.`;
        } else {
            return `You only have ${item.count} of ${item.name}.`;
        }
    }

    eatItem(p, i) {
        let user = this.getUser(p);
        let item = this.findInvItem(p, i);

        if (typeof(item) === "undefined") return "Couldn't find the item in your inventory.";
        if (item.edible) {
            item.count -= 1;
            this.invClearEmpty(p);
            return `${p.name} ate ${item.name}.`;
        } else {
            return "This item isn't edible.";
        }
    }

    findShopItem(i) {
        let found = false;
        let iret = {};
        this.shop.items.forEach(item => {
            if (item.name.includes(i) == true) {
                iret = item;
                found = true;
            }
        });
        if (found == true) {
            return iret;
        }
    }

    getShopList() {
        return this.shop.items;
    }

    findInvItem(p, i) {
        let found = false;
        let iret = {};
        this.getUser(p).inventory.forEach(item => {
            if (item.name.includes(i) == true) {
                iret = item;
                found = true;
            }
        });
        if (found == true) {
            return iret;
        }
    }

    invClearEmpty(p) {
        let inv = this.getInv(p);
        inv.forEach(item => {
            if (item.count <= 0) {
                inv.splice(inv.indexOf(item), 1);
            }
        });
        this.save();
    }
}