<template>
  <div>
    <!-- <input type="text" v-model="message" >
    <input type="button"  v-on:click="getText"> -->
    <Speech @onTranscriptionEnd="sendSpeech"/>
    <p>{{transcripted}}</p>
  </div>
</template>

<script>
import axios from "axios";
import Speech from "./Speech.vue";
import socketIo from "socket.io-client";

export default {
  name: "InputText",
  components: {
    Speech
  },
  data() {
    return {
      message: "",
      transcripted: "",
      socket: socketIo("http://localhost:1337")
    };
  },
  methods: {

    // getText(message){
    //   // this.sendText(this.message);
    //   // console.log(this.transcripted);
    //   this.sendText(this.message)

    // },
    sendSpeech({ lastSentence, transcription }) {
      this.transcripted = lastSentence;
      this.sendText(this.transcripted);
    },
    sendText(text) {
      const baseURL = "https://api.dialogflow.com/v1/query?v=20170712";
      const token = "ad977ccc6ca04209942b49c7ead14c09";
      let data = {
        query: text || this.message,
        lang: "fr-Fr",
        sessionId: "remoteapp"
      };

      axios
        .post(`${baseURL}`, data, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          const dialogFlowResponse = JSON.parse(response.request.response);
          // console.log(dialogFlowResponse);
          const parameters = dialogFlowResponse.result.parameters || null;
          
          if (parameters && parameters.diapo === '') {
            console.log('arnold called');
            this.socket.emit("arnold", dialogFlowResponse);
            this.socket.emit('response', dialogFlowResponse);          
          }
          else if (parameters && parameters.stop) {
            this.socket.emit("REMOVE", dialogFlowResponse);
            console.log('soppppped');
            console.log(dialogFlowResponse);
          }
          else if (parameters && parameters.etape) {
            this.socket.emit("STEP", dialogFlowResponse);
            console.log('Slide suivante');
            console.log(dialogFlowResponse);
          }
          else if (parameters && parameters.bonjour) {
            this.socket.emit("bonjour", dialogFlowResponse);
            console.log('bonjour');
          }
          else if (parameters && parameters.url) {
            this.socket.emit("url", dialogFlowResponse);
          }
          else if (parameters && parameters.close) {
            this.socket.emit("CLOSE_URL", dialogFlowResponse);
          }

        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
