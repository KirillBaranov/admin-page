<template>
  <input :type="options && options.type ? options.type : 'text'"
         :value="value"
         :id="id"
         :class="cssClass"
         autocomplete="off"
         :disabled="disabled"
         @input="onInput"
         :placeholder="placeholder">
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    },
    id: {
      type: String,
      required: true,
    },
    options: {
      type: Object,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    cssClass() {
      let str = 'input ';

      if ( this.options && this.options.class != '' ) {
        str += this.options.class;
      }

      if ( this.disabled ) {
        str += ' disabled';
      }

      return str;
    }
  },
  methods: {
    onInput( event ) {
      if ( !this.disabled ) {
        this.$emit( 'onInput', event.target.value );
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid var(--primary-color);
    font-weight: 500;
    font-size: 18px;
    background: none;
    line-height: 21px;
    color: var(--secondary-color);
    padding-left: 28px;
    padding-right: 28px;
    z-index: 1;

    &.disabled {
      cursor: not-allowed;
    }

    &.completed {
      background: var(--primary-color);
    }

    &:focus {
      outline: none;
    }
  }
</style>
