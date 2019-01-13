<template>
  <div>
    <NextSlideButton/>
    <PreviousSlideButton/>
    <InputText/>
  </div>
</template>

<script>
import NextSlideButton from "@/components/NextSlideButton.vue";
import PreviousSlideButton from "@/components/PreviousSlideButton.vue";
import InputText from "@/components/InputText.vue";

export default {
  name: "Remote",
  components: {
    NextSlideButton,
    PreviousSlideButton,
    InputText
  }
};
</script>
