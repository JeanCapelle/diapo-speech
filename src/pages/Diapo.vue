<template>
  <div>
    <div class="slider-container">
      <section class="slide" id="1">slide</section>
      <section class="slide" id="2">slide</section>
      <section class="slide" id="3">slide</section>
      <section class="slide" id="4">slide</section>
      <section class="slide" id="5">slide</section>
    </div>
    <div class="control">
      <button @click="nextSlide">Suivant</button>  
    </div>
  </div>
</template>

<script>
import socketIo from "socket.io-client";
export default {
  name: "Diapo",
  components: {},
  data() {
    
    return {
      socket: socketIo("http://localhost:1337"),
      counter : 1
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
    },
    nextSlide(){
      this.counter += 1;
    }
  }
};
</script>
<style scoped lang="scss">
@import '/src/assets/resetCss.css';
.slide {
  height: 100vh;
  background-color:  grey;
  text-align:center;
  font-size: 3em;
}
.control{
  position: fixed;
  bottom: 20px;
  left: 20px;
  input{
    background-color: white;
    width: 80px;
    height: 35px;
    display: inline-block;
    border-radius: 15px;
  }
}


</style>
