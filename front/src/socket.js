import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
    connected: false,
    started: false,
    finish: false,
    connections: 0,
    color: '#10001d',
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8000";

export const socket = io(URL);

socket.on("connect", () => {
    state.connected = true;
});

socket.on("disconnect", () => {
    state.connected = false;
});

socket.on('start', (data) => {
    console.log('Message received:  ', data)
    state.started = data
    state.finish = false
})

socket.on('color', (data) => {
    console.log('Color received:  ', data)
    state.color = data
})
socket.on('finish', (data) => {
    console.log('Finish received:  ', data)
    state.finish = data
})

