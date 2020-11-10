const Client = require("mpp-client-xt");

module.exports = class {
    constructor (ws) {
        this.client = new Client(ws);
        this.client.on('error', event => {
            console.error("MPP Client Error: ", event.message);
            setTimeout(() => {
                this.client.start();
            }, 1000);
        });
        this.client.on('hi', () => {
            console.log("MPP: Connected");
        });
    }

    connect(room) {
        this.client.start();
        this.room = room;
        this.client.setChannel(room);
    }

    
    chat(string) {
        this.client.sendArray([{m:'a', message:`\u034f${string}`}]);
    }
}