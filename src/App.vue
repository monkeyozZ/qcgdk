<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {mapActions} from 'vuex'
/* import authApi from '@/api/auth' */
export default {
  name: 'App',
  methods: {
    ...mapActions({
      setregisterid: 'setregisterid'
    })
  },
  beforeMount () {
    let registerid = Cookies.get('registerid')
    if (registerid) {
      this.setregisterid(registerid)
    }
  }
}
</script>

<style lang="stylus">
@import "assets/stylus/reset.css"
body
  background-color #f6f6f6
  padding-bottom 50px
  box-sizing border-box
.van-swipe__indicators
  bottom 20px!important
  .van-swipe__indicator
    width 8px
    height 8px
    background-color rgba(255,255,255,.5)
  .van-swipe__indicator--active
    background-color #fff
.tip
  .van-notice-bar__wrap
    color #383838
.loan_container
  .van-tab
    padding 0
  .van-tabs__wrap
    width 100%
    background #fff
    .van-tabs__nav
      width 65%
      margin 0 auto
  .van-tabs__content
    margin-top 8px
  .van-tab--active
    font-size 17px!important
    font-weight 700!important
    color #e75833!important
  .van-tabs__line
    background-color #e75833
.form_box
  textarea.van-field__control
    border 1px solid #c7c7c9
    padding-left 8px
.van-tabbar--fixed
  z-index 9999
.container
  .nav_box
    .van-tabs__content
      width 100%
      position absolute
      top 155px
      background #fff
      padding 10px
      box-sizing border-box
    .van-tabs__nav--card
      width 70%
      margin 0 auto
      border 1px solid #fff
      background-color inherit
      .van-tab
        color #fff
        background-color inherit
        border-right 1px solid #fff
      .van-tab--active
        color #fe7b38
        background-color #fff
        border-right 1px solid #fff
.van-checkbox--checked
  color #f4b43f!important
  background-color #ffffff!important
  border-color #898989!important
.van-checkbox--round
  border-radius 3px!important
.form_box
  .van-field__control
    text-align right
    &::-webkit-input-placeholder
       text-align right
.personal-form
  .van-field__control
    text-align right
    padding-right 20px!important
    &::-webkit-input-placeholder
      text-align right
.van-dialog__message--withtitle
  text-align center
.swiper-pagination-bullet-active
  background: rgba(255,255,255,1)!important;
</style>
