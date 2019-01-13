<template>
  <div>
    <button id="previous-button" @click="previousSlide">Précédent</button>
  </div>
</template>

<script>
export default {
  name: "PreviousSlideButton",
  methods: {
    previousSlide() {
      console.log("ok");
      this.$socket.send("previous");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
