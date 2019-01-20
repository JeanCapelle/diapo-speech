<template>
<div>
    <img class="background" v-bind:src="'slide' + myProp+'.jpg'" /> 
</div>
</template>

<script>
    export default {
        props: ['myProp'],
        mounted() {
            console.log(this.myProp); // foobar
        }
    };
</script>
<style>
body{
  margin: 0;
  overflow: hidden;
}
.background{
  width: 100%;
  height:100vh;

}
</style>
