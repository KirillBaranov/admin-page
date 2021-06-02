<template>
  <div class="button" @mouseleave="hideAdvice">
    <div class="advice" v-if="show && advice && advice != ''">{{ advice }}</div>

    <button :class="options.class" @click="click" v-html="text"></button>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    advice: {
      type: String,
      required: false,
      default: ''
    },
    callback: {
      required: false,
      default: false
    },
    text: {
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: {
        class: 'button'
      }
    }
  },
  methods: {
    click() {
      this.$emit( 'click', this.callback );

      this.showAdvice();
    },
    showAdvice() {

    },
    hideAdvice() {

    }
  }
}
</script>

<style scoped>

</style>
