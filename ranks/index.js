module.exports = class {
    constructor () {
        this.ranks = require("./ranks.json");
    }

    getRank(id) {
        if (this.ranks.owner.indexOf(id) !== -1) {
            return {id: 4, name: "Owner"};
        } else if (this.ranks.godmin.indexOf(id) !== -1) {
            return {id: 3, name: "Godmin"};
        } else if (this.ranks.admin.indexOf(id) !== -1) {
            return {id: 2, name: "Admin"};
        } else if (this.ranks.mods.indexOf(id) !== -1) {
            return {id: 1, name: "Moderator"};
        } else if (this.ranks.banned.indexOf(id) !== -1) {
            return {id: -1, name: "Banned"};
        } else {
            return {id: 0, name: "User"};
        }
    }
}