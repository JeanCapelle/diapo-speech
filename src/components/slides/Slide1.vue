<template>
  <div :data-id="id">
  <img v-bind:src="'' + id+'.png'" /> 
<!-- <img v-bind:src="imgUrl + '/logo.png'"> -->
  </div>

</template>

<script>
export default {
  name: "Slide1",
  components:{

  },
  
  data(){
    return{
      id:'slide1'
      // hello: 'missions.png'
      
    }
  },mounted(){
    // console.log(counter);
  }
}
</script>

<style>
body, html {
  margin: 0;
  height: 100vh;
  overflow:hidden;
}

.background{
  width: 100%;
  height:100vh;

}
</style>
