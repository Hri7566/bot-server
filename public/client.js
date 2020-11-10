function scrollToTop() {
    let ele = $("#chat").get(0);
    ele.scrollTop = ele.scrollHeight - ele.clientHeight;
}

function chatrecieve(msg) {
    let li = $('<li><span class="name" style="font-weight: bold;"/><span class="message"/>');

    li.find(".name").text(msg.p.name + ": ");
    li.find(".message").text(msg.a);
    li.css("color", msg.p.color || "black");

    if (msg.a !== "undefined") {
        $("#chat ul").append(li);
        scrollToTop();
    }
}

$("#chatinput").on("focus", (evt) => {
    scrollToTop();
});

var ws = new WebSocket(`wss://${window.location.hostname}:443`);

var participant = {
    name: "You",
    color: "#555",
    _id: 1
}

ws.onmessage = (event) => {
    if (JSON.parse(event.data).p.color == "send") {
        participant._id = JSON.parse(event.data).p._id;
        return;
    }
    let msg = JSON.parse(event.data);
    if (msg.p._id == participant._id) {
        chatrecieve(msg);
    }
}

$("#chatinput").on("keydown", function (evt) {
    if (evt.keyCode == 13) {
        let message = $(this).val();
        if (message.length <= 512) {
            send(message);
            $(this).get(0).value = "";
        }
    }
});

$(document).on("keydown", function (evt) {
    if (evt.keyCode == 13) {
        $("#chatinput").get(0).focus();
    }
});

function send(message) {
    if (message.length <= 0) return;
    let msg = {
        p: participant,
        a: message,
        m: 'a'
    }

    ws.send(JSON.stringify(msg));
}