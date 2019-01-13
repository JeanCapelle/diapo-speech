<template>
  <div>
    <input type="text" v-model="message">
    <input type="button" @click="sendText">
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
          const parameters = dialogFlowResponse.result.parameters || null;
          console.log(parameters.diapo);

          if (parameters && parameters.diapo === '') {
            console.log('arnold called');
            this.socket.emit("arnold", dialogFlowResponse);
          }
          if (parameters && parameters.etape) {
            this.socket.emit("STEP", parameters.etape);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
