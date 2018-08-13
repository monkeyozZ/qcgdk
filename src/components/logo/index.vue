<template>
  <div class="logo_box">
    <svg-icon icon-class="logo"></svg-icon>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" scoped>
  .logo_box
    max-width 100%
    width: 100%
    text-align center
    padding: 10px 0
    .svg-icon
      width 95px
      height 25px
@media (max-width:320px)
    .logo_box
      max-width 100%
      width 100%
      text-align center
      padding 8px 0
      .svg-icon
        width 90px
        height 20px
</style>
