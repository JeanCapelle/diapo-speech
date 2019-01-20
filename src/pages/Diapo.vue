<template>
  <div>
    <div class="slider-container">
        <test v-if="counter <= totalSlide" :my-prop="counter"></test>
        <section class="slide" v-if="counter === totalSlide"><final/></section>
    </div>

    <div class="control">
      <button @click="previousSlide">Précédent</button>
      <button @click="nextSlide">Suivant</button>  
    </div>
     <transition name="fade"> 
          <div class="arnold" v-if="showArnold" >
             <img src="arnold.png" alt="">
            <div class="speech-commend"> {{speechCommand}}</div>

          </div>
   
      </transition>      
  </div>
</template>

<script>
/* eslint-disable */
import socketIo from "socket.io-client";
import test from "@/components/slides/test.vue";
// import final from "@/components/slides/final.vue";

export default {
  name: "Diapo",
  components: {
    test,
    // final
  },
  data() {
    return {
      socket: socketIo("http://localhost:1337"),
      counter : 1,
      totalSlide: 28,
      showArnold: false,
      speechCommand: '',
      hello: 'foobar'
 
    };
  },

  mounted() {
    this.onArnold();
    this.onNewStep();
    this.onRemoveArnold();
    this.onSayHello();
    this.onResponse();
    this.onOpenUrl();
    this.closeUrl();

  },
  methods: {
    onResponse(){
      this.socket.on("response", data => {
        console.log(data);
        // this.speechCommand = data.result.fulfillment.speech;
      });      
    },
    onArnold(){
      this.socket.on("arnold", data => {
        console.log(data);

        this.showArnold = true;
        this.textToSpeech(data);
      });
    },
    onNewStep() {
      this.socket.on("NEW_STEP", data => {
        console.log(data);
        this.textToSpeech(data.result.fulfillment.speech);
        if(data.result.parameters.etape === 'suivante'){
          this.nextSlide()
        }
        if(data.result.parameters.etape === 'précédente'){
          this.previousSlide()
        }
      });

    },
    onRemoveArnold() {
      this.socket.on("REMOVE_ARNOLD", data => {
        console.log(data);
        if(data.result.parameters.stop === 'stop'){
          this.textToSpeech(data.result.fulfillment.speech);
          this.showArnold = false;   
        }
      });

    },
    onOpenUrl() {
      this.socket.on("URL", data => {
        console.log(data);
        if(data.result.parameters.url){
          this.textToSpeech(data.result.fulfillment.speech);
          var newWindow = window.open(data.result.parameters.url , '_blank', 'location=yes,height=770,width=720,scrollbars=yes,status=yes')
          this.showArnold = false; 

        }
      });
    },
    closeUrl(){
      this.socket.on("CLOSE_URL", data => {
      // console.log(data);
        this.textToSpeech(data.result.fulfillment.speech);
        newWindow.close()
        // this.showArnold = false;   

      });      
    },
    onSayHello() {
      this.socket.on("BONJOUR_JURY", data => {
      // console.log(data);
        this.textToSpeech(data.result.fulfillment.speech);
        // this.showArnold = false;   

      });

    },
    nextSlide(){
      const counter = this.counter + 1;
      if(counter <= this.totalSlide) {
        this.counter += 1;
        this.showArnold = false;
        console.log(this.counter);
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
.arnold{
  .speech-commend{
    position: absolute;
    z-index: 2;
    right: 97px;
    height: 500px;
    width: 300px;
    bottom: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    border-radius: 8px;
  }
}

  img{
    width: 450px;
    position: fixed;
    bottom: 0;
    right: 10px;
    z-index: 1;
  }


</style>
