<script>
import { state, socket } from "@/socket";

import HomeComponent from "@/components/Home.vue";
import LinksComponent from "@/components/Links.vue";
export default {
  name: "HomePage",
  components: {
    HomeComponent,
    LinksComponent,
  },
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
    links() {
      return state.showLinks;
    },
  },
};
</script>

<template>
  <div>
    <links-component />
  </div>
</template>


