<template>
  <main
    :style="{
      backgroundColor: color,
    }"
  >
    <img src="@/assets/fundo-final.png" />
    <h1 v-if="showAvisos" class="aviso">
      Participe conosco, deixe o celular no para o alto com a tela apontada para
      o palco
    </h1>
    <h1 v-if="finished === true">
      Obrigado por participar, estou te redirecionando para o nosso Instagram em
      <span>{{ countTime }}</span>
    </h1>
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
      countTime: 3,
      showAvisos: true,
    };
  },
  watch: {
    async finished(to) {
      console.log("mudou finished", to);
      if (to === true) {
        for (let i = 0; i < 3; i++) {
          await new Promise((resolve) => {
            setTimeout(() => {
              this.countTime--;

              if (this.countTime == 0) {
                let newTab = window.open();
                newTab.location.href =
                  "https://www.instagram.com/oraulfernand/";
                return;
              }
            }, 2500);

            resolve();
          });
        }
      }
    },
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