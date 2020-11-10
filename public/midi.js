function runmidi(file, port) {
    ws.send(JSON.stringify({m:'midi', data:{type:'file', file:file, port:port}}));
}

function killall() {
    ws.send(JSON.stringify({m:'midi', data:{type:'killall'}}));
}

var ws = new WebSocket(`wss://${window.location.hostname}:443`);

var participant = {
    name: "You",
    color: "#555",
    _id: 1
}

ws.onmessage = (event) => {
    let msg = JSON.parse(event.data);
    if (typeof(msg.p) === "undefined") return;
    if (msg.p.color == "send") {
        participant._id = JSON.parse(event.data).p._id;
        return;
    }
    if (msg.p._id == participant._id) {
        
    }
}

function send(message) {
    if (message.length <= 0) return;
    let msg = {
        p: participant,
        a: message
    }

    ws.send(JSON.stringify(msg));
}