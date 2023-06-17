<template>
  <main
    :style="{
      backgroundColor: color,
    }"
  >
    <img src="@/assets/fundo-final.png" />
    <h1 v-if="showAvisos && finished == false" class="aviso">
      Participe conosco, deixe o celular no para o alto com a tela apontada para
      o palco
    </h1>
    <div class="finished" v-if="finished === true">
      <img src="@/assets/instagram.png" />
      <a
        href="https://www.instagram.com/oraulfernand/"
        target="_blank"
        rel="noopener noreferrer"
        >Seguir No Instagram</a
      >
    </div>
  </main>
</template>

<script>
import { state, socket } from "@/socket";

export default {
  computed: {
    connected() {
      return state.connected;
    },
    finished() {
      return state.finish;
    },
    color() {
      return state.color;
    },
  },
  data() {
    return {
      showAvisos: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showAvisos = false;
    }, 5000);
  },
};
</script>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0px;
  left: 0px;
  transition: 0.5s all ease-in-out;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
}

main img {
  width: 180%;
}

main h1 {
  font-weight: bold;
  font-size: 26px;
  color: #fff;
  text-align: center;
}

.finished {
  width: 95%;
  margin: auto;
  display: block;
  border-radius: 10px;
  background: #fff;
  padding: 20px;
  margin-top: -110px;
}

.finished img {
  max-width: 100%;
}

.finished a {
  background: #0095f6;
  color: #fff;
  display: block;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
}

main h1.aviso {
  background: #fefefe;
  width: 90%;
  margin: auto;
  display: block;
  border-radius: 20px;
  color: #020202;
  padding: 25px;
}
</style>