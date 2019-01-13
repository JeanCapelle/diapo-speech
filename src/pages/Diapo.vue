<template>
  <div>
    <h1>DIAPO</h1>
  </div>
</template>

<script>
import socketIo from "socket.io-client";
export default {
  name: "Diapo",
  components: {},
  data() {
    return {
      socket: socketIo("http://localhost:1337")
    };
  },
  mounted() {
    this.onNewStep();
  },
  methods: {
    onNewStep() {
      this.socket.on("NEW_STEP", data => {
        console.log(data);
      });
    }
  }
};
</script>
