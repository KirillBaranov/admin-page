<template>
  <div class="output__template">

    <template v-if="result.error == ''">
      <OutputHeader time="0 ms" :meta="meta"></OutputHeader>

      <div class="output__body online-template">
        <div class="output__body-block" v-if="result.result && result.result.length != 0">
          <OnlineTemplate v-for="( server, index ) in result.result"
                        :key="index"
                        :id="index + 1"
                        :server="server">
          </OnlineTemplate>
        </div>

      </div>
    </template>

    <template v-else>
      <OutputHeader time="0 ms" meta="Возникла ошибка при выполнении запроса, перезагрузите страницу."></OutputHeader>
    </template>
  </div>
</template>

<script>
import {mapState} from "vuex";
import OutputHeader from "./header/OutputHeader";

import OnlineTemplate from './parts/Online.part';

export default {
  name: "Online.template.vue",
  components: {
    OutputHeader,
    OnlineTemplate
  },
  props: {
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState( 'CheckModule', [
      'input'
    ]),
    meta() {
      if ( this.result.result && this.result.result.length > 0 ) {
        const filter = this.result.result.filter( item => {
          return typeof item.players == 'number';
        });

        const map = filter.map( item => {
          return item.players;
        });

        const online = map.reduce( ( accum = 0, item ) => {
          return accum + item;
        });

        return `Общий онлайн: ${online}`;
      }

      return 'Произошла ошибка, попробуйте перезагрузить страницу.';
    },
    matches() {
      return this.result.result && this.result.result.length ? this.result.result.length : 'Ничего не найдено.';
    }
  },
  methods: {
    refresh() {
      this.$emit( 'refresh' );
    }
  }
}
</script>

<style lang="scss">
.output__body-title {
  margin-top: 62px;
  margin-bottom: 41px;

  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  color: #FFFFFF;
}

.output__body.online-template {
  margin-top: 41px;

  .online__part-wrapper {
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
