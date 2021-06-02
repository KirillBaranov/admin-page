<template>
  <div class="output__header">
    <p class="output__executing-time">Время выполнения: {{ getQueryTime }} ms</p>

    <div class="output__line"></div>

    <div class="output__query-meta" v-html="meta"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "OutputHeader",
  props: {
    meta: {
      type: String,
      required: false,
      default: 'Запрашиваемый ник: '
    }
  },
  computed: {
    ...mapGetters( 'CheckModule', [
      'getQueryTime'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .output__header {
    margin-top: 65px;
  }

  .output__executing-time {
    margin-bottom: 18px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;

    color: var(--secondary-color);
  }

  .output__line {
    width: 100%;
    height: 1px;

    background: rgba(255, 255, 255, 0.31);
    margin-bottom: 34px;
  }

  .output__query-meta {
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;

    color: var(--secondary-color);
  }
</style>
