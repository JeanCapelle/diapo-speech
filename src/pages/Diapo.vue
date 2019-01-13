<template>
  <div>
    <div class="slider-container">
      <section class="slide" v-if="counter === 1"><Slide1/></section>
      <section class="slide" v-if="counter === 2">slide 2</section>
      <section class="slide" v-if="counter === 3">slide 3</section>
      <section class="slide" v-if="counter === 4">slide 4</section>
      <section class="slide" v-if="counter === 5">slide 5</section>
    </div>
    <div class="control">
      <button @click="nextSlide">Suivant</button>  
      <button @click="previousSlide">Précédent</button>  
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import socketIo from "socket.io-client";
import Slide1 from "@/components/slides/Slide1.vue";
export default {
  name: "Diapo",
  components: {
    Slide1
  },
  data() {
    
    return {
      socket: socketIo("http://localhost:1337"),
      counter : 1,
      totalSlide: 5
    };
  },

  mounted() {
    this.onNewStep();
  },
  methods: {
    onNewStep() {
      this.socket.on("NEW_STEP", data => {
        console.log(data);
        if(data === 'suivante'){
          this.nextSlide()
        }
        if(data === 'précédente'){
          this.previousSlide()
        }
      });
      this.socket.on("arnold", data => {
        console.log(data);
      });
    },
    nextSlide(){
      const counter = this.counter + 1;
      if(counter <= this.totalSlide) {
        this.counter += 1;
      }
    },
    previousSlide(){
      const counter = this.counter - 1;
      if(counter >= 0) {
        this.counter -= 1;
      }
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
