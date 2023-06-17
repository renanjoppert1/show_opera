const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

const connections = []
let started = false
let showLinks = false

const defaultColor = '#10001d';
let selectedColor = defaultColor;

const coresHex = [
    { color: '#edc901', tempo: 6833 },
    { color: '#6f0be2', tempo: 11833 },
    { color: '#edc901', tempo: 13633 },
    { color: '#6f0be2', tempo: 1083 },
    { color: '#edc901', tempo: 417 },
    { color: '#6f0be2', tempo: 833 },
    { color: '#edc901', tempo: 12633 },
    { color: '#6f0be2', tempo: 2133 },
    { color: '#edc901', tempo: 17217 },
    { color: '#6f0be2', tempo: 1717 },
    { color: '#edc901', tempo: 13250 },
    { color: '#6f0be2', tempo: 1067 },
    { color: '#edc901', tempo: 1067 },
    { color: '#6f0be2', tempo: 2100 },
    { color: '#edc901', tempo: 917 },
    { color: '#6f0be2', tempo: 4250 },
    { color: '#edc901', tempo: 5800 },
    { color: '#6f0be2', tempo: 883 },
    { color: '#edc901', tempo: 967 },
    { color: '#6f0be2', tempo: 1050 },
    { color: '#edc901', tempo: 133 },
    { color: '#6f0be2', tempo: 217 },
    { color: '#edc901', tempo: 300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 4800 },
    { color: '#edc901', tempo: 2000 },
    { color: '#6f0be2', tempo: 83 },
    { color: '#edc901', tempo: 167 },
    { color: '#6f0be2', tempo: 250 },
    { color: '#edc901', tempo: 333 },
    { color: '#6f0be2', tempo: 417 },
    { color: '#edc901', tempo: 500 },
    { color: '#6f0be2', tempo: 583 },
    { color: '#edc901', tempo: 667 },
    { color: '#6f0be2', tempo: 5050 },
    { color: '#edc901', tempo: 1250 },
    { color: '#6f0be2', tempo: 333 },
    { color: '#edc901', tempo: 417 },
    { color: '#6f0be2', tempo: 500 },
    { color: '#edc901', tempo: 583 },
    { color: '#6f0be2', tempo: 667 },
    { color: '#edc901', tempo: 750 },
    { color: '#6f0be2', tempo: 833 },
    { color: '#edc901', tempo: 6467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 717 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 883 },
    { color: '#edc901', tempo: 967 },
    { color: '#6f0be2', tempo: 1050 },
    { color: '#edc901', tempo: 133 },
    { color: '#6f0be2', tempo: 217 },
    { color: '#edc901', tempo: 300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 717 },
    { color: '#edc901', tempo: 6917 },
    { color: '#6f0be2', tempo: 7383 },
    { color: '#edc901', tempo: 5217 },
    { color: '#6f0be2', tempo: 1717 },
    { color: '#edc901', tempo: 13250 },
    { color: '#6f0be2', tempo: 1067 },
    { color: '#edc901', tempo: 1067 },
    { color: '#6f0be2', tempo: 2100 },
    { color: '#edc901', tempo: 917 },
    { color: '#6f0be2', tempo: 3050 },
    { color: '#edc901', tempo: 217 },
    { color: '#6f0be2', tempo: 633 },
    { color: '#edc901', tempo: 1000 },
    { color: '#6f0be2', tempo: 417 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 1217 },
    { color: '#edc901', tempo: 583 },
    { color: '#6f0be2', tempo: 1000 },
    { color: '#edc901', tempo: 383 },
    { color: '#6f0be2', tempo: 800 },
    { color: '#edc901', tempo: 1167 },
    { color: '#6f0be2', tempo: 583 },
    { color: '#edc901', tempo: 6133 },
    { color: '#6f0be2', tempo: 217 },
    { color: '#edc901', tempo: 300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 717 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 5133 },
    { color: '#edc901', tempo: 1333 },
    { color: '#6f0be2', tempo: 417 },
    { color: '#edc901', tempo: 500 },
    { color: '#6f0be2', tempo: 583 },
    { color: '#edc901', tempo: 667 },
    { color: '#6f0be2', tempo: 750 },
    { color: '#edc901', tempo: 833 },
    { color: '#6f0be2', tempo: 917 },
    { color: '#edc901', tempo: 1000 },
    { color: '#6f0be2', tempo: 4383 },
    { color: '#edc901', tempo: 1583 },
    { color: '#6f0be2', tempo: 667 },
    { color: '#edc901', tempo: 750 },
    { color: '#6f0be2', tempo: 833 },
    { color: '#edc901', tempo: 917 },
    { color: '#6f0be2', tempo: 1000 },
    { color: '#edc901', tempo: 83 },
    { color: '#6f0be2', tempo: 167 },
    { color: '#edc901', tempo: 5800 },
    { color: '#6f0be2', tempo: 883 },
    { color: '#edc901', tempo: 967 },
    { color: '#6f0be2', tempo: 1050 },
    { color: '#edc901', tempo: 133 },
    { color: '#6f0be2', tempo: 217 },
    { color: '#edc901', tempo: 300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 1650 },
    { color: '#edc901', tempo: 1500 },
    { color: '#6f0be2', tempo: 1300 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 1733 },
    { color: '#edc901', tempo: 1583 },
    { color: '#6f0be2', tempo: 1383 },
    { color: '#edc901', tempo: 883 },
    { color: '#6f0be2', tempo: 1817 },
    { color: '#edc901', tempo: 1667 },
    { color: '#6f0be2', tempo: 1467 },
    { color: '#edc901', tempo: 967 },
    { color: '#6f0be2', tempo: 1833 },
    { color: '#edc901', tempo: 1883 },
    { color: '#6f0be2', tempo: 3233 },
    { color: '#edc901', tempo: 1083 },
    { color: '#6f0be2', tempo: 883 },
    { color: '#edc901', tempo: 1383 },
    { color: '#6f0be2', tempo: 1317 },
    { color: '#edc901', tempo: 1167 },
    { color: '#6f0be2', tempo: 967 },
    { color: '#edc901', tempo: 1467 },
    { color: '#6f0be2', tempo: 1400 },
    { color: '#edc901', tempo: 1250 },
    { color: '#6f0be2', tempo: 1050 },
    { color: '#edc901', tempo: 550 },
    { color: '#6f0be2', tempo: 1267 },
    { color: '#edc901', tempo: 1150 },
    { color: '#6f0be2', tempo: 1333 },
    { color: '#edc901', tempo: 5883 },
    { color: '#6f0be2', tempo: 967 },
    { color: '#edc901', tempo: 1050 },
    { color: '#6f0be2', tempo: 133 },
    { color: '#edc901', tempo: 217 },
    { color: '#6f0be2', tempo: 300 },
    { color: '#edc901', tempo: 383 },
    { color: '#6f0be2', tempo: 467 },
    { color: '#edc901', tempo: 550 },
    { color: '#6f0be2', tempo: 4883 },
    { color: '#edc901', tempo: 2083 },
    { color: '#6f0be2', tempo: 167 },
    { color: '#edc901', tempo: 250 },
    { color: '#6f0be2', tempo: 333 },
    { color: '#edc901', tempo: 417 },
    { color: '#6f0be2', tempo: 500 },
    { color: '#edc901', tempo: 583 },
    { color: '#6f0be2', tempo: 667 },
    { color: '#edc901', tempo: 6300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 717 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 883 },
    { color: '#edc901', tempo: 967 },
    { color: '#6f0be2', tempo: 5300 },
    { color: '#edc901', tempo: 1500 },
    { color: '#6f0be2', tempo: 583 },
    { color: '#edc901', tempo: 667 },
    { color: '#6f0be2', tempo: 750 },
    { color: '#edc901', tempo: 833 },
    { color: '#6f0be2', tempo: 917 },
    { color: '#edc901', tempo: 1000 },
    { color: '#6f0be2', tempo: 83 },
    { color: '#edc901', tempo: 5717 },
    { color: '#6f0be2', tempo: 800 },
    { color: '#edc901', tempo: 883 },
    { color: '#6f0be2', tempo: 967 },
    { color: '#edc901', tempo: 1050 },
    { color: '#6f0be2', tempo: 133 },
    { color: '#edc901', tempo: 217 },
    { color: '#6f0be2', tempo: 300 },
    { color: '#edc901', tempo: 383 },
    { color: '#6f0be2', tempo: 4717 },
    { color: '#edc901', tempo: 1917 },
    { color: '#6f0be2', tempo: 1000 },
    { color: '#edc901', tempo: 83 },
    { color: '#6f0be2', tempo: 167 },
    { color: '#edc901', tempo: 250 },
    { color: '#6f0be2', tempo: 333 },
    { color: '#edc901', tempo: 417 },
    { color: '#6f0be2', tempo: 500 },
    { color: '#edc901', tempo: 6133 },
    { color: '#6f0be2', tempo: 217 },
    { color: '#edc901', tempo: 300 },
    { color: '#6f0be2', tempo: 383 },
    { color: '#edc901', tempo: 467 },
    { color: '#6f0be2', tempo: 550 },
    { color: '#edc901', tempo: 633 },
    { color: '#6f0be2', tempo: 717 },
    { color: '#edc901', tempo: 800 },
    { color: '#6f0be2', tempo: 5133 },
    { color: '#edc901', tempo: 1333 },
    { color: '#6f0be2', tempo: 417 },
    { color: '#edc901', tempo: 500 },
    { color: '#6f0be2', tempo: 583 },
    { color: '#edc901', tempo: 667 },
    { color: '#6f0be2', tempo: 750 },
    { color: '#edc901', tempo: 833 },
    { color: '#6f0be2', tempo: 917 },
    { color: '#edc901', tempo: 7667 },
    { color: '#6f0be2', tempo: 750 },
    { color: '#edc901', tempo: 833 },
    { color: '#6f0be2', tempo: 917 },
    { color: '#edc901', tempo: 1000 },
    { color: '#6f0be2', tempo: 83 },
    { color: '#edc901', tempo: 167 },
    { color: '#6f0be2', tempo: 250 },
    { color: '#edc901', tempo: 333 },
    { color: '#6f0be2', tempo: 4667 },
    { color: '#edc901', tempo: 1883 },
    { color: '#6f0be2', tempo: 967 },
    { color: '#edc901', tempo: 1050 },
    { color: '#6f0be2', tempo: 133 },
    { color: '#edc901', tempo: 217 },
    { color: '#6f0be2', tempo: 300 },
    { color: '#edc901', tempo: 383 },
    { color: '#6f0be2', tempo: 467 },
    { color: '#edc901', tempo: 6083 },
    { color: '#6f0be2', tempo: 167 },
    { color: '#edc901', tempo: 250 },
    { color: '#6f0be2', tempo: 333 },
    { color: '#edc901', tempo: 417 },
    { color: '#6f0be2', tempo: 500 },
    { color: '#edc901', tempo: 583 },
    { color: '#6f0be2', tempo: 667 },
    { color: '#edc901', tempo: 750 },
    { color: '#6f0be2', tempo: 5083 },
    { color: '#edc901', tempo: 10767 },


    { color: defaultColor, tempo: 1500 }
];


io.on("connection", (socket) => {
    console.log("A user with ID: " + socket.id + " connected");
    connections.push(socket.id);

    socket.broadcast.emit("connections", connections.length);
    socket.emit("color", selectedColor);
    if (showLinks === true) {
        socket.emit("links", true);
    }

    socket.on("disconnect", function () {
        console.log("A user with ID: " + socket.id + " disconnected");
        const index = connections.indexOf(socket.id);

        if (index > -1) {
            connections.splice(index, 1);
            socket.broadcast.emit("connections", connections.length);
        }
    });

    socket.on("start", async (data) => {
        socket.broadcast.emit("start", data);
        started = data
        if (started === true) {
            showLinks = false
        }

        for (let i = 0; i < coresHex.length; i++) {
            if (started != true) {
                socket.broadcast.emit("color", defaultColor);
                socket.broadcast.emit("loadCover", true);
                i = coresHex.length
                return
            }

            socket.broadcast.emit("loadCover", false);

            const { color, tempo } = coresHex[i];
            selectedColor = color;
            socket.broadcast.emit("color", selectedColor);
            if ((i + 1) === coresHex.length) {
                socket.broadcast.emit("color", defaultColor);
                socket.broadcast.emit("finish", true);
            }
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve();
                }, tempo);
            });
        }
    });

    socket.on('finish', async data => {
        socket.broadcast.emit("start", false);
        started = false
        socket.broadcast.emit("color", defaultColor);
        socket.broadcast.emit("finish", true);
    })

    socket.on('links', () => {
        socket.broadcast.emit("links", true);
        started = false
        showLinks = true
    })

});


httpServer.listen(3000);
