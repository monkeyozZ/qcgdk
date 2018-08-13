<template>
  <div>
    <van-tabbar v-model="active">
      <van-tabbar-item to="/index">
        <span>推荐</span>
        <svg-icon slot="icon" icon-class="tab1"></svg-icon>
      </van-tabbar-item>
      <van-tabbar-item to="/loan/list">
        <span>贷款</span>
        <svg-icon slot="icon" icon-class="tab2"></svg-icon>
      </van-tabbar-item>
      <van-tabbar-item to="/card/list">
        <span>信用卡</span>
        <svg-icon slot="icon" icon-class="tab3" style="width:26px;height:26px"></svg-icon>
      </van-tabbar-item>
      <van-tabbar-item to="/own/list">
        <span>我的</span>
        <svg-icon slot="icon" icon-class="tab4"></svg-icon>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    setactive () {
      let currenturl = this.$route.path
      // console.log(currenturl)
      switch (currenturl) {
        case '/index':
          this.active = 0
          break
        case '/loan/list':
          this.active = 1
          break
        case '/card/list':
          this.active = 2
          break
        case '/own/list':
          this.active = 3
          break
        case '/own/viewHistory':
          this.active = 3
          break
        default:
          this.active = 0
          break
      }
    }
  },
  watch: {
    '$route': 'setactive'
  },
  mounted () {
    this.setactive()
  }
}
</script>

<style lang="stylus" scoped>
.van-tabbar-item
  .svg-icon
    width 22px
    height 22px
.van-tabbar-item--active
  color #e38049
</style>
