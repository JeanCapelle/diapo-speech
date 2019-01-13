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
      <button @click="previousSlide">Précédent</button>
      <button @click="nextSlide">Suivant</button>  
      <transition name="fade"> 
          <div class="arnold" v-if="showArnold" > <img src="arnold.png" alt="">
            <div class="speech-commend"> {{speechCommand}}</div>
          </div>
   
      </transition>
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
      totalSlide: 5,
      showArnold: false,
      speechCommand: ''
    };
  },

  mounted() {
    this.onNewStep();
  },
  methods: {
    // onResponse(){
    //   this.socket.on("response", data => {
    //     // console.log(data);
    //     // this.speechCommand = data.result.resolvedQuery;
    //   });      
    // },
    onNewStep() {
      this.socket.on("NEW_STEP", data => {
        console.log(data);
        this.textToSpeech(data.result.fulfillment.speech)
        if(data.result.parameters.etape === 'suivante'){
          this.nextSlide()
        }
        if(data.result.parameters.etape === 'précédente'){
          this.previousSlide()
        }
      });
      this.socket.on("arnold", data => {
        console.log(data);
        this.showArnold = true;
        this.textToSpeech(data);
      });
    },
    nextSlide(){
      const counter = this.counter + 1;
      if(counter <= this.totalSlide) {
        this.counter += 1;
        this.showArnold = false;
      }
    },
    previousSlide(){
      const counter = this.counter - 1;
      if(counter != 0) {
        this.counter -= 1;
        this.showArnold = false;

      }
    },
    textToSpeech(dataText){
        var msg = new SpeechSynthesisUtterance();
        var voices = window.speechSynthesis.getVoices();
        // msg.voice = voices[10]; // Note: some voices don't support altering params
        msg.voiceURI = 'native';
        msg.volume = 1; // 0 to 1
        msg.rate = 1; // 0.1 to 10
        msg.pitch = 1; //0 to 2
        msg.text = `${dataText}`;
        msg.lang = 'fr-FR';
        speechSynthesis.speak(msg);
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
  .arnold{
    img{
      width: 240px;
      position: fixed;
      bottom: 0;
      right: 10px;
    }
  }
  
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

}


</style>
