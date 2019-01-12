<template>
  <div>
    <input type="text" v-model="message" >    
    <input type="button" @click="sendText" >
    <Speech @onTranscriptionEnd="sendSpeech"/>
    <p>{{transcripted}}</p>   
  </div>
</template>

<script>
import axios from 'axios';
import Speech from './Speech.vue';
export default {
  name: 'InputText',
  components:{
      Speech
  },
  data() {
      return {
          message:'',
          transcripted: ''
      } 
  },
  methods: {
    sendSpeech({lastSentence, transcription}){
        console.log(transcription);
        this.transcripted = lastSentence;
        this.sendText(transcripted);
    },
    sendText(text){
      console.log('ok');
    //   this.$socket.send(this.message);

        const baseURL = "https://api.dialogflow.com/v1/query?v=20170712";
        const token = "ad977ccc6ca04209942b49c7ead14c09";
        let data = {
            query : text || this.message,
            lang: 'fr-Fr',
            sessionId: 'remoteapp'
        }

        axios.post(`${baseURL}`, data, {headers: { Authorization: `Bearer ${token}` }})
        .then( response => {
            const dialogFlowResponse = JSON.parse(response.request.response);
            const parameters = dialogFlowResponse.result.parameters || null;
            if(parameters){
                this.$socket.send(parameters.etape);
            }

        })
        .catch((error) => {
            console.error(error);
        })    

    }
        
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
