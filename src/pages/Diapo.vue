<template>
  <div>
    <h1>DIAPO</h1>
  </div>
</template>

<script>
export default {
  name: "Diapo",
  components: {},
  mounted() {
    this.sockets.subscribe("NEW_STEP", data => {
      console.log(data);
    });
  }
};
</script>
