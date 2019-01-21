<template>
<div >
 
<div v-if="myProp < 29">   <img class="background"  v-bind:src="'slide' + myProp+'.jpg'" /> </div>
<div v-if="myProp == 29"> <final/>  </div>
</div>
    
</template>

<script>
import final from "@/components/slides/final.vue";
    export default {
        components:{
            final

        },
        props: ['myProp'],
        mounted() {
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
