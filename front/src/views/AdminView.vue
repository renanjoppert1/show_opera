<script>
import { state, socket } from "@/socket";

export default {
  name: "AdminPage",
  data() {
    return {
      startedState: false,
      total: 0,
    };
  },

  computed: {
    connected() {
      return state.connected;
    },
    connections() {
      return state.connections;
    },
    started() {
      console.log("oi", state);
      this.startedState = state.started;
      return state.started;
    },
  },

  async mounted() {
    socket.on("connections", (data) => {
      console.log("connections received:  ", data);
      console.log(this);
      this.total = data;
    });
  },
  methods: {
    start() {
      console.log("preparando envio para começar...");
      socket.emit("start", true);
      socket.emit("color", "#fff");
      this.startedState = true;
    },
    stop() {
      console.log("preparando envio para parar...");
      socket.emit("start", false);
      this.startedState = false;
    },
    connect() {
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },
  },
};
</script>

<template>
  <main>
    <div class="info">
      <span v-show="false">{{ started }}</span>
      <span>Conexões: {{ total }}</span>
      <p>Connected: {{ connected }}</p>
      <p>Started: {{ startedState }}</p>
    </div>
    <div class="buttons">
      <button class="start" @click="start()">Iniciar</button>
      <button class="stop" @click="stop()">Parar</button>
      <button class="default" @click="connect()">Connect</button>
      <button class="default" @click="disconnect()">Disconnect</button>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100vw;
  height: 100vh;
  background: #10001d;
  position: fixed;
  top: 0px;
  left: 0px;
  color: #999999;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 320px;
  margin-top: 20px;
}

.buttons button {
  width: 100%;
  margin-bottom: 20px;
  padding: 15px 00px;
  border: 0px;
  border-radius: 0.375rem;
  background: #33005e;
  color: #fff;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
}

.buttons button:hover {
  box-shadow: 0px 5px 50px #8501b9;
}
</style>
