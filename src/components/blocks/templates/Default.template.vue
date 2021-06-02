<template>
  <div class="output__template">
    <OutputHeader time="0 ms" meta="Выберите интересующий пункт, впишите значение в поле и нажмите вперед."></OutputHeader>
  </div>
</template>

<script>
import OutputHeader from "./header/OutputHeader";

import { mapGetters } from 'vuex';

export default {
  name: "Default.template",
  components: {
    OutputHeader
  },
}
</script>

<style lang="scss" scoped>

</style>
