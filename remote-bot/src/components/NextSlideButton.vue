<template>
  <div>
    <button id="next-button" @click="nextSlide"> Suivant</button>
    
  </div>
</template>

<script>
export default {
  name: 'NextSlideButton',
  methods: {
    nextSlide(){
      console.log('ok');
      this.$socket.send('next');
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
