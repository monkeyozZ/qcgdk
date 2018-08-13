<template>
  <div>
    <div class="title">
      <p>您最近浏览过以下产品：</p>
    </div>
    <div class="history_box">
      <ul>
        <li v-for="(item, index) in loanlist" :key="index">
          <van-row>
              <van-col span="6">
                <img :src="baseimgurl + item.imgurl">
                <p class="name">{{item.title}}</p>
              </van-col>
              <van-col span="17" offset="1">
                <h1 class="item_title">{{item.des}}</h1>
                <a :href="item.url">
                  <p class="text">查看详情<svg-icon icon-class="arrow"></svg-icon></p>
                </a>
              </van-col>
          </van-row>
        </li>

        <li v-for="(item, index) in cardlist" :key="index">
          <van-row>
              <van-col span="6">
                <img :src="baseimgurl + item.imgurl">
                <p class="name">{{item.title}}</p>
              </van-col>
              <van-col span="17" offset="1">
                <h1 class="item_title">{{item.des}}</h1>
                <a :href="item.url">
                  <p class="text">查看详情<svg-icon icon-class="arrow"></svg-icon></p>
                </a>
              </van-col>
          </van-row>
        </li>
        <li v-if="loanlist.length === 0 && cardlist.length === 0"><p style="text-align: center;font-size: 14px;"><svg-icon icon-class="nohas" style="margin-right: 15px"></svg-icon>没有历史哟，赶紧去逛逛吧！</p></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import loanApi from '@/api/loan'
import cardApi from '@/api/card'
import { Row, Col } from 'vant'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  data () {
    return {
      loanid: [],
      cardid: [],
      loanlist: [],
      cardlist: [],
      baseimgurl: process.env.BASE_API
    }
  },
  methods: {
    getloanid () {
      let loanidarr = Cookies.get('laonviewhistory')
      if (loanidarr !== undefined) {
        loanidarr = new Set(loanidarr.split(','))
        this.loanid = [...loanidarr]
      }
    },
    getcardid () {
      let cardidarr = Cookies.get('cardviewhistory')
      if (cardidarr !== undefined) {
        cardidarr = new Set(cardidarr.split(','))
        this.cardid = [...cardidarr]
      }
    },
    getlist () {
      if (this.loanid) {
        loanApi.gethistorylist(this.loanid).then((result) => {
          if (result.data.status === 200) {
            this.loanlist = result.data.historylist
          }
        }).catch((err) => {
          console.log(err)
        })
      }

      if (this.cardid) {
        cardApi.gethistorylist(this.cardid).then((result) => {
          if (result.data.status === 200) {
            this.cardlist = result.data.historylist
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    this.getloanid()
    this.getcardid()
    this.getlist()
  }
}
</script>

<style lang="stylus" scoped>
  .title
    background #fff
    padding 0 20px
    p
      font-size 14px
      color #676767
      line-height 45px
  .history_box
    ul
      li
        padding 15px 10px
        margin-top 15px
        box-sizing border-box
        overflow hidden
        background #fff
        .van-col
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
          h1.item_title
            font-size 15px
            color #333
            font-weight bold
            line-height 20px
          p.name
            font-size 12px
            text-align center
            font-weight bold
            margin-top 8px
          p.text
            margin-top 20px
            font-size 14px
            color #333
            .svg-icon
              color #e85d39
              margin-left 5px
</style>
