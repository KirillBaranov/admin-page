<template>
  <div class="output__template">
    <OutputHeader time="0 ms"
                  meta="Возникла непредвиденная ошибка, пожалуйста, перезагрузите страницу или попробуйте позже.">
    </OutputHeader>
  </div>
</template>

<script>
import OutputHeader from "./header/OutputHeader";

import { mapGetters } from 'vuex';

export default {
  name: "Error.template",
  components: {
    OutputHeader
  },
}
</script>

<style lang="scss" scoped>

</style>
