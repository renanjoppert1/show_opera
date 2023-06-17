<template>
  <main
    :style="{
      backgroundColor: color,
    }"
  >
    <video id="video-background" autoplay loop muted>
      <source src="@/assets/video.webm" type="video/webm" />
      <source src="@/assets/video.mp4" type="video/mp4" />
      <!-- Coloque outros formatos de vídeo aqui, como WebM ou Ogg, para garantir a compatibilidade em diferentes navegadores -->
      <img src="@/assets/fundo.png" alt="Fallback Image" />
    </video>
    <div id="video-overlay">
      <img src="@/assets/fundo-final.png" />
      <div class="content">
        <h1>Siga-nos nas redes sociais</h1>
        <ul>
          <li>
            <a
              href="https://api.whatsapp.com/send?phone=5541984862043&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20agenda"
              >Nossa Agenda</a
            >
          </li>
          <li>
            <a href="https://www.instagram.com/oraulfernand/">Instagram</a>
          </li>
          <li>
            <a href="https://www.youtube.com/@raulfernandes1640">Youtube </a>
          </li>
        </ul>
      </div>
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

#video-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

#video-background,
#video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#video-background {
  object-fit: cover;
}

#video-overlay {
  background-color: rgba(2, 2, 2, 0.8);
}

#video-overlay img {
  width: 180%;
}

#video-overlay .content {
  color: #fff !important;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin-top: -110px;
}

#video-overlay .content h1 {
  font-weight: bold;
  font-size: 22px;
}

#video-overlay .content ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
  margin-top: 20px;
}
#video-overlay .content ul li {
  display: block;
  width: 100%;
}
#video-overlay .content ul li a {
  display: block;
  background: #c202f2;
  color: #fff;
  padding: 20px 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
}

#video-overlay {
  background-color: rgba(2, 2, 2, 0.8);
}
</style>