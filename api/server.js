const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const connections = []
let started = false

const defaultColor = '#10001d';
let selectedColor = defaultColor;

const coresHex = [
    { color: '#edc901', tempo: 7000 },               // 0 - 7s
    { color: '#6f0be2', tempo: 10000 },              // 7 - 17s
    { color: '#edc901', tempo: 13000 },              // 17 - 30s             01
    { color: '#6f0be2', tempo: 500 },                // 30 - 30.5s           02
    { color: '#edc901', tempo: 500 },                // 30.5 - 31s             03
    { color: '#6f0be2', tempo: 500 },                // 31 - 31.5s           04
    { color: '#edc901', tempo: 12500 },              // 31.5 - 44s           
    { color: '#6f0be2', tempo: 1000 },               // 44 - 45s           
    { color: '#edc901', tempo: 17000 },              // 45 - 60s + 2          
    { color: '#6f0be2', tempo: 1500 },               // 60s + 2 - 60s + 3.5s         
    { color: '#edc901', tempo: 12500 },              // 60s + 3.5s - 60s + 16s           
    { color: '#6f0be2', tempo: 1000 },               // 60s + 16s  - 60s + 17s           
    { color: '#edc901', tempo: 1000 },               // 60s + 17s  - 60s + 18s           
    { color: '#6f0be2', tempo: 2000 },               // 60s + 18s  - 60s + 20s           
    { color: '#edc901', tempo: 1000 },               // 60s + 20s  - 60s + 21s           
    { color: '#6f0be2', tempo: 3000 },               // 60s + 21s  - 60s + 24s           
    { color: '#edc901', tempo: 6000 },               // 60s + 24s  - 60s + 30s           
    { color: '#6f0be2', tempo: 4000 },               // 60s + 30s  - 60s + 34s           
    { color: '#edc901', tempo: 2000 },               // 60s + 34s  - 60s + 36s           
    { color: '#6f0be2', tempo: 2000 },               // 60s + 36s  - 60s + 40s           
    { color: '#edc901', tempo: 16000 },               // 60s + 40s  - 60s + 56s           
    { color: '#6f0be2', tempo: 6000 },               // 60s + 56s  - 120s + 2s           
    { color: '#edc901', tempo: 5000 },               // 120s + 2s  - 120s + 7s           
    { color: '#6f0be2', tempo: 1000 },               // 120s + 7s  - 120s + 8s           
    { color: '#edc901', tempo: 13000 },               // 120s + 8s  - 120s + 21s           
    { color: '#6f0be2', tempo: 1000 },               // 120s + 21s  - 120s + 22s           
    { color: '#edc901', tempo: 1000 },               // 120s + 22s  - 120s + 23s           
    { color: '#6f0be2', tempo: 2000 },               // 120s + 23s  - 120s + 25s           
    { color: '#edc901', tempo: 1000 },               // 120s + 25s  - 120s + 26s           
    { color: '#6f0be2', tempo: 1500 },               // 120s + 26s  - 120s + 27.5s           
    { color: '#edc901', tempo: 500 },               // 120s + 27.5s  - 120s + 28s           
    { color: '#6f0be2', tempo: 500 },               // 120s + 27.5s  - 120s + 28s           
    { color: '#edc901', tempo: 500 },               // 120s + 27.5s  - 120s + 28s           
    { color: '#6f0be2', tempo: 500 },               // 120s + 28s  - 120s + 28.5s           
    { color: '#edc901', tempo: 500 },               // 120s + 28.5s  - 120s + 29s           
    { color: '#6f0be2', tempo: 500 },               // 120s + 29s  - 120s + 29.5s          
    { color: '#edc901', tempo: 500 },               // 120s + 29.5s  - 120s + 30s    
    { color: '#6f0be2', tempo: 500 },               // 120s + 30s  - 120s + 30.5s          
    { color: '#edc901', tempo: 500 },               // 120s + 30.5s  - 120s + 31s    
    { color: '#6f0be2', tempo: 500 },               // 120s + 31s  - 120s + 31.5s          
    { color: '#edc901', tempo: 500 },               // 120s + 31.5s  - 120s + 32s  
    { color: '#6f0be2', tempo: 1000 },               // 120s + 32s  - 120s + 33s    
    { color: '#edc901', tempo: 5000 },               // 120s + 33s  - 120s + 38s           
    { color: '#6f0be2', tempo: 5000 },               // 120s + 38s  - 120s + 43s           
    { color: '#edc901', tempo: 5000 },               // 120s + 43s  - 120s + 44s           
    { color: '#6f0be2', tempo: 5000 },               // 120s + 44s  - 120s + 49s           
    { color: '#edc901', tempo: 7000 },               // 120s + 49s  - 120s + 56s           
    { color: '#6f0be2', tempo: 2000 },               // 120s + 56s  - 120s + 58s           
    { color: '#edc901', tempo: 5000 },               // 120s + 56s  - 120s + 58s           
    { color: '#6f0be2', tempo: 1000 },               // 120s + 58s  - 120s + 59s           
    // { color: '#00FF00', tempo: 1500 },
    // { color: '#0000FF', tempo: 1500 },
    // { color: '#FFFF00', tempo: 1500 },
    // { color: '#FF00FF', tempo: 1500 },
    // { color: '#00FFFF', tempo: 1500 },
    // { color: '#FFA500', tempo: 1500 },
    // { color: '#800080', tempo: 1500 },
    // { color: '#008000', tempo: 1500 },
    // { color: '#FFC0CB', tempo: 1500 },
    // { color: '#FFFFE0', tempo: 1500 },
    // { color: '#008080', tempo: 1500 },
    // { color: '#800000', tempo: 1500 },
    // { color: '#FFD700', tempo: 1500 },
    // { color: '#FF4500', tempo: 1500 },
    // { color: '#000080', tempo: 1500 },
    // { color: '#808080', tempo: 1500 },
    // { color: '#FF69B4', tempo: 1500 },
    // { color: '#CD5C5C', tempo: 1500 },
    // { color: '#0000CD', tempo: 1500 },
    // { color: '#FF6347', tempo: 1500 },
    // { color: '#800000', tempo: 1500 },
    // { color: '#7CFC00', tempo: 1500 },
    // { color: '#FF00FF', tempo: 1500 },
    // { color: '#8A2BE2', tempo: 1500 },
    // { color: '#228B22', tempo: 1500 },
    // { color: '#000080', tempo: 1500 },
    // { color: '#FFA07A', tempo: 1500 },
    // { color: '#808000', tempo: 1500 },
    // { color: '#FF8C00', tempo: 1500 },
    // { color: '#BA55D3', tempo: 1500 },
    // { color: '#006400', tempo: 1500 },
    // { color: '#FF69B4', tempo: 1500 },
    // { color: '#B8860B', tempo: 1500 },
    // { color: '#00FFFF', tempo: 1500 },
    // { color: '#FF1493', tempo: 1500 },
    // { color: '#ADFF2F', tempo: 1500 },
    // { color: '#4B0082', tempo: 1500 },
    // { color: '#D2691E', tempo: 1500 },
    // { color: '#00BFFF', tempo: 1500 },
    // { color: '#FF4500', tempo: 1500 },
    // { color: '#2E8B57', tempo: 1500 },
    // { color: '#9932CC', tempo: 1500 },
    // { color: '#808080', tempo: 1500 },
    // { color: '#DC143C', tempo: 1500 },
    // { color: '#00FA9A', tempo: 1500 },
    // { color: '#9932CC', tempo: 1500 },
    // { color: '#8B0000', tempo: 1500 },
    // { color: '#2F4F4F', tempo: 1500 },
    // { color: '#FFFF00', tempo: 1500 },
    // { color: '#6A5ACD', tempo: 1500 },
    // { color: '#008080', tempo: 1500 },
    // { color: '#FF8C00', tempo: 1500 },
    // { color: '#A0522D', tempo: 1500 },
    // { color: '#5F9EA0', tempo: 1500 },
    // { color: '#D2B48C', tempo: 1500 },
    // { color: '#3CB371', tempo: 1500 },
    // { color: '#800080', tempo: 1500 },
    // { color: '#8B008B', tempo: 1500 },
    // { color: '#B22222', tempo: 1500 },
    // { color: '#2E8B57', tempo: 1500 },
    // { color: '#FF6347', tempo: 1500 },
    // { color: '#008080', tempo: 1500 },
    // { color: '#BDB76B', tempo: 1500 },
    // { color: '#4682B4', tempo: 1500 },
    // { color: '#DAA520', tempo: 1500 },
    // { color: '#FF00FF', tempo: 1500 },
    // { color: '#9ACD32', tempo: 1500 },
    // { color: '#6B8E23', tempo: 1500 },
    // { color: '#9932CC', tempo: 1500 },
    // { color: '#A52A2A', tempo: 1500 },
    // { color: '#006400', tempo: 1500 },
    // { color: '#FFD700', tempo: 1500 },
    // { color: '#FF4500', tempo: 1500 },
    // { color: '#9400D3', tempo: 1500 },
    // { color: '#8B4513', tempo: 1500 },
    // { color: '#4169E1', tempo: 1500 },
    // { color: '#CD853F', tempo: 1500 },
    // { color: '#00FFFF', tempo: 1500 },
    // { color: '#9370DB', tempo: 1500 },
    // { color: '#A0522D', tempo: 1500 },
    // { color: '#8B4513', tempo: 1500 },
    // { color: '#7B68EE', tempo: 1500 },
    // { color: '#00CED1', tempo: 1500 },
    // { color: '#F08080', tempo: 1500 },
    // { color: '#32CD32', tempo: 1500 },
    // { color: '#8B0000', tempo: 1500 },
    // { color: '#6B8E23', tempo: 1500 },
    // { color: '#9932CC', tempo: 1500 },
    // { color: '#FF1493', tempo: 1500 },
    // { color: '#FF8C00', tempo: 1500 },
    // { color: '#696969', tempo: 1500 },
    // { color: '#FF69B4', tempo: 1500 },
    // { color: '#2E8B57', tempo: 1500 },
    // { color: '#FFD700', tempo: 1500 },
    // { color: '#A0522D', tempo: 1500 },
    // { color: '#800000', tempo: 1500 },
    // { color: '#FF4500', tempo: 1500 },
    // { color: '#9932CC', tempo: 1500 },
    // { color: '#8B008B', tempo: 1500 },
    // { color: '#B22222', tempo: 1500 },
    // { color: '#228B22', tempo: 1500 }
    { color: defaultColor, tempo: 1500 }
];



console.clear()

io.on("connection", (socket) => {
    console.log("A user with ID: " + socket.id + " connected");
    connections.push(socket.id);
    socket.broadcast.emit("connections", connections.length);
    socket.emit("color", selectedColor);

    socket.on("disconnect", function () {
        console.log("A user with ID: " + socket.id + " disconnected");
        const index = connections.indexOf(socket.id);
        console.log(index);
        if (index > -1) {
            connections.splice(index, 1);
            socket.broadcast.emit("connections", connections.length);
        }
    });

    socket.on("start", async (data) => {
        socket.broadcast.emit("start", data);
        started = data

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

});


httpServer.listen(8000);
