<template>
  <div>
    <div class="notice_box">
      <van-cell-group>
        <van-cell :title="item.title | shortsub" is-link :to="{name:'noticedetails', params: { id: item._id }}" v-for="(item, index) in arr" :key="index"/>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import noticeApi from '@/api/notice'
import { Cell, CellGroup } from 'vant'
export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  },
  data () {
    return {
      arr: [
        /* {
          id: 1,
          title: '汪书记，牛逼啊',
          content: '汪书记，牛逼啊，牛逼啊牛逼啊啊啊啊啊汪书记，牛逼啊，牛逼啊牛逼啊啊啊啊啊，草他妈的，公司sb真的多的啊草' +
                    '傻逼傻逼傻逼不傻逼傻逼傻逼傻逼是不是他妈的',
          isread: false
        } */
      ]
    }
  },
  methods: {
    getlist () {
      noticeApi.getlist().then((result) => {
        if (result.data.status === 200) {
          this.arr = result.data.noticelist
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getlist()
  }
}
</script>

<style lang="stylus" scoped>
  .notice_box
    height 100vh
    background #ffffff
</style>
