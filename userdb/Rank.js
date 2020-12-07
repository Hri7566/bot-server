module.exports = class {
    constructor (type) {
        let t = this.getNameAndIdFromType(type);
        this.name = t.name;
        this.id = t.id;
    }

    getNameAndIdFromType(type) {
        let inc = (n) => {
            return type.toLowerCase().includes(n);
        }
        if (inc("owner")) {
            return {name: "Owner", id: 4};
        } else if (inc("godmin")) {
            return {name: "Godmin", id: 3};
        } else if (inc("admin")) {
            return {name: "Admin", id: 2};
        } else if (inc("mod")) {
            return {name: "Mod", id: 1};
        } else if (inc("ban")) {
            return {name: "Banned", id: -1};
        } else if (inc("user")) {
            return {name: "User", id: 0};
        } else {
            return {name: "User", id: 0};
        }
    }
}