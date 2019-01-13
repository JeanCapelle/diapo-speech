<template>
  <div>
<!-- <button id="moveTo">Move to {{page2}} slide 2</button> -->

<div id="fullpage">
    <div class="control"> 
        <!-- <button v-on:click="changeSlide">Précédent</button> -->
        <button @click="nextSlide">Suivant</button>
    <p>The button above has been clicked {{ counter }} times.</p>
    </div>
    <div class="section" id="one">
      <div class="top-title">
        <h1>Juger la pertinence d'un agent conversationnel</h1>
      </div>
    </div>
    <div class="section" id="2">
        <div class="slide" data-anchor="slide1">Two 1</div>
        <div class="slide" data-anchor="slide2">Two 2</div>
    </div>
    <div class="section" id="3">Three</div>
    <div class="section" id="4">Four</div>
</div>
  </div>
</template>

<script>
  
export default {
  name: 'Slide',
  data(){
    return {
      counter : 0
    }
  },
  methods: {
    nextSlide() {
      this.counter +=1;
      
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '/src/assets/resetCss.css';
.section {
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
