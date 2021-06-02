<template>
  <div class="output__template">

    <template v-if="result.error == ''">
      <OutputHeader time="0 ms" :meta="meta"></OutputHeader>

      <div class="output__body info-template">

        <div class="output__body-title">Кол-во похожих ников: {{ matches }}</div>

        <div class="output__body-block info"
             v-if="result.result && result.result.length != 0">
          <InfoTemplate v-for="( user, index ) in result.result"
                        :key="index"
                        :id="index + 1"
                        @refresh="refresh"
                        :user="user">
          </InfoTemplate>
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

import InfoTemplate from './parts/Info.part';

export default {
  name: "Info.template.vue",
  components: {
    OutputHeader,
    InfoTemplate
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
      return `Запрашиваемый ник: ${this.input}`;
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
  .output__template {
    .output__body-block.info {
      display: grid;
      justify-content: space-between;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
    }
  }

  @media ( max-width: 1280px ) {
    .output__template {
      .output__body-block.info {
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  @media ( max-width: 768px ) {
    .output__template {
      .output__body-block.info {
        grid-template-columns: 1fr;
      }
    }
  }

  .output__body-title {
    margin-top: 62px;
    margin-bottom: 41px;

    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: var( --font-color );
  }
</style>
