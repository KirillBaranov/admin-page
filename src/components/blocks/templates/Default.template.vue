<template>
  <div class="output__template">

    <template v-if="result.error == ''">
      <OutputHeader time="0 ms" :meta="meta"></OutputHeader>

      <div class="output__body">

      </div>
    </template>

    <template v-else>
      <OutputHeader time="0 ms" meta="Возникла ошибка при выполнении запроса, перезагрузите страницу."></OutputHeader>
    </template>
  </div>
</template>

<script>
import OutputHeader from "./header/OutputHeader";

import { mapGetters } from 'vuex';

export default {
  name: "Tps.template",
  components: {
    OutputHeader
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters( 'CheckModule', [
      'getCurrentServer'
    ]),
    meta() {
      return `Запрашиваемый сервер: ${this.getCurrentServer}`;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
