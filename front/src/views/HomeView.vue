<script>
import { state, socket } from "@/socket";
export default {
  name: "HomePage",
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
};
</script>

<template>
  <main
    :style="{
      backgroundColor: color,
    }"
  >
    <img src="@/assets/fundo-final.png" />
    <h1 v-if="finished === true">
      Obrigado por participar, estou te redirecionando para o nosso Instagram em
      <span>{{ countTime }}</span>
    </h1>
  </main>
</template>

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
</style>
