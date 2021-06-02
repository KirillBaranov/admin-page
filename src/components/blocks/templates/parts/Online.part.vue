<template>
  <div class="online__part-wrapper">
    <span class="online__part-title">{{ server.name }}: </span>
    <span class="online__part-players" >{{ server.players != false ? server.players : 0 }}</span>
  </div>
</template>

<script>
export default {
  name: "Online.part",
  props: {
    server: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .online__part-wrapper {
    font-weight: 500;
    font-size: 18px;
    line-height: 19px;

    color: #FFFFFF;
  }

  .online__part-players {
    color: #FD6950;
  }
</style>
