var genesis = require('./messages_load.js');

var messages = [];
var messagesByUser = {};
var doneCb;

module.exports = {

    load: function (cb) {
        doneCb = cb;
        genesis.set();
        genesis.init(function (mssgs) {
            messages = mssgs;
            set();
        });
    },

    getMessages: function () {
        return messages;
    },

    getMessagesByUser: function (user) {
        if (messagesByUser[user] !== undefined) {
            return messagesByUser[user];
        } else {
            return [];
        }
    },

    addMessage: function (sender, recipient, timestamp, text, read) {
        genesis.getContract().addMessage(sender, recipient, timestamp, text, read, addMessageCb);
        messages.push({ sender: sender, recipient: recipient, timestamp: timestamp, text: text, read: read });
        set();
    },

    changeRead: function (sender, timestamp, read) {
        var index = findMessage(sender, timestamp);

        if (index != -1) {
            genesis.getContract().changeRead(index, read);
            messages[index].read = read;
            set();
        } else {
            throw new Error("Message not found.");
        }
    }

}

function findMessage(sender, timestamp) {
    var index;

    for (index = 0; index < messages.length; index++) {
        if (messages[index].sender === sender && messages[index].timestamp === timestamp) {
            return index;
        }
    }

    return -1;
}

function set() {
    messagesByUser = {};

    messages.forEach(function (value) {
        if (messagesByUser[value.recipient] == undefined) {
            messagesByUser[value.recipient] = new Array(value);
        } else {
            var arr = messagesByUser[value.recipient];
            arr.push(value);
            messagesByUser[value.recipient] = arr;
        }
    });

    doneCb();
}

function addMessageCb(error) {
    if (!error) {
        console.log("Message added.");
    } else {
        console.log("Something went wrong while adding the message. See stacktrace.\n", error.stack);
    }
}