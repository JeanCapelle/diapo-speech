<template>
  <div id="app">
    <NextSlideButton/> 
    <PreviousSlideButton/> 
    <InputText/> 
  </div>
</template>

<script>
import NextSlideButton from './components/NextSlideButton.vue'
import PreviousSlideButton from './components/PreviousSlideButton.vue'
import InputText from './components/InputText.vue'

export default {
  name: 'app',
  components: {
    NextSlideButton,
    PreviousSlideButton,
    InputText,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
