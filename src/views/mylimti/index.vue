<template>
  <div>
    <div class="title">
      <h1>
        您的授信额度是根据您的测算信息推算出的结果，只作为参考，具体下款额度由各平台决定。
      </h1>
    </div>
    <div class="limti_box">
      <div class="num_text">
        <p>￥{{money}}</p>
        <p>您的授信额度</p>
      </div>
    </div>

    <div class="banner">
      <router-link to="/testlimti">
        <img src="../../assets/images/limti_banner.jpg" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      money: 10000
    }
  }
}
</script>

<style lang="stylus" scoped>
  .title
    background #fff7ea
    padding 0 15px
    h1
      font-size 15px
      color #ffc568
      line-height 24px
      padding 5px 0
  .limti_box
    position relative
    width 100
    height 115px
    background -webkit-linear-gradient(left, #4b87f3 40%, #3e71ec)
    .num_text
      width 50%
      position absolute
      top 50%
      left 50%
      transform translate(-50%,-50%)
      p
        color #ffffff
        text-align center
        &:first-child
          font-size 25px
        &:last-child
          font-size 12px
          margin-top 10px
  .banner
    margin-top 15px
    padding 0 10px
    img
      display inline-block
      max-width 100%
      width 100%
      height auto
</style>
