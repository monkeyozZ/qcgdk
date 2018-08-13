<template>
  <scroll ref="scroll" class="wrapper"
      :bounce="{top: false}">
    <div class="container">
      <div class="own_header">
        <div class="avt_box">
          <div class="pic_box">
            <div class="radius_box">
              <router-link to="/personal">
              <img :src="user_info.headimgurl?user_info.headimgurl:baseavt" alt="头像">
              </router-link>
            </div>
          </div>
          <div class="text_box">
            <p>{{user_info.nickname?user_info.nickname:basename}}</p>
          </div>
        </div>
      </div>
      <div class="item_box">
          <van-row>
            <van-col span="8">
              <router-link :to="{path: '/loan/list', query: {cate: 'item2'}}">
                <p>{{loancount?loancount:0}}</p>
                <p>我的贷款</p>
              </router-link>
            </van-col>
            <van-col span="8">
              <router-link :to="{path: '/card/list', query: {cate: 'item2'}}">
                <p>{{cardcount?cardcount:0}}</p>
                <p>我的信用卡</p>
              </router-link>
            </van-col>
            <van-col span="6" v-show="false">
              <router-link to="/mylimti">
                <p>￥10000</p>
                <p>授信额度</p>
              </router-link>
            </van-col>
            <van-col span="8">
              <router-link to="/notice">
                <p>{{noticecount?noticecount:0}}</p>
                <p>消息通知</p>
              </router-link>
            </van-col>
          </van-row>
        </div>
        <div class="own_manager">
          <h1 class="title">我的管理</h1>
          <div class="manager_box">
            <van-row>
              <van-col span="6">
                <router-link to="/own/viewHistory">
                  <svg-icon icon-class="zuji"></svg-icon>
                  <p>我的足迹</p>
                </router-link>
              </van-col>
            </van-row>
            <div class="banner" v-for="(item, index) in advlist" :key="index" v-show="item.cate === 'loan'">
              <a :href="item.url">
                <img :src="baseimgurl + item.imgurl" :alt="item.des">
              </a>
            </div>
          </div>
        </div>

        <div class="own_tool">
          <h1 class="title">我的工具</h1>
          <div class="tool_box">
            <van-row>
              <van-col span="6">
                <router-link to="/calculator">
                  <svg-icon icon-class="calc"></svg-icon>
                  <p>还款计算</p>
                </router-link>
              </van-col>
              <van-col span="6">
                <router-link to="/newgift">
                  <svg-icon icon-class="gift"></svg-icon>
                  <p>新人礼包</p>
                </router-link>
              </van-col>
            </van-row>
            <div class="banner" v-for="(item, index) in advlist" :key="index" v-show="item.cate === 'card'">
              <a :href="item.url">
                <img :src="baseimgurl + item.imgurl" :alt="item.des">
              </a>
            </div>
          </div>
        </div>

        <div class="own_other">
          <h1 class="title">其他</h1>
          <div class="other_box">
            <van-row>
              <van-col span="6">
                <router-link to="/about">
                  <svg-icon icon-class="about"></svg-icon>
                  <p>关于我们</p>
                </router-link>
              </van-col>
              <van-col span="6">
                <router-link to="/indemnity">
                  <svg-icon icon-class="statement"></svg-icon>
                  <p>免责声明</p>
                </router-link>
              </van-col>
              <van-col span="6" @click.native="cooperation">
                <a href="javascript:;">
                  <svg-icon icon-class="hezuo"></svg-icon>
                  <p>商务合作</p>
                </a>
              </van-col>
              <van-col span="6" @click.native="weiquan">
                <a href="javascript:;">
                  <svg-icon icon-class="weiquan"></svg-icon>
                  <p>法务维权</p>
                </a>
              </van-col>
            </van-row>
          </div>
        </div>
    </div>
  </scroll>
</template>

<script>
import { Row, Col, Dialog } from 'vant'
import {mapGetters} from 'vuex'
import NoticeApi from '@/api/notice'
import LoanApi from '@/api/loan'
import CardApi from '@/api/card'
import indexApi from '@/api/index'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Dialog.name]: Dialog
  },
  data () {
    return {
      baseavt: require('../../assets/images/avt.png'),
      basename: '未登录用户',
      noticecount: null,
      loancount: null,
      cardcount: null,
      baseimgurl: process.env.BASE_API,
      advlist: []
    }
  },
  computed: {
    ...mapGetters({
      user_info: 'user_info'
    })
  },
  methods: {
    getcount () {
      NoticeApi.getcount().then((result) => {
        if (result.data.status === 200) {
          this.noticecount = result.data.count
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getloancount () {
      LoanApi.getbillcount(this.user_info.openid).then((result) => {
        if (result.data.status === 200) {
          this.loancount = result.data.loancount
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getcardcount () {
      CardApi.getcardcount(this.user_info.openid).then((result) => {
        if (result.data.status === 200) {
          this.cardcount = result.data.cardcount
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getlastadv () {
      indexApi.getlastadv().then((res) => {
        if (res.data.status === 200) {
          // console.log(res)
          this.advlist = res.data.advlist
        }
      })
    },
    cooperation () {
      this.$dialog.alert({
        title: '商务合作',
        message: 'hezuo@qincengu.com',
        closeOnClickOverlay: true
      })
    },
    weiquan () {
      this.$dialog.alert({
        title: '法务维权',
        message: 'law@qincengu.com',
        closeOnClickOverlay: true
      })
    }
  },
  mounted () {
    this.getcount()
    this.getlastadv()
    setTimeout(() => {
      this.getloancount()
      this.getcardcount()
    }, 20)
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    height calc(100vh - 50px)
  .container
    position relative
    .own_header
      width 100%
      height 125px
      background url('../../assets/images/own_header.png')
      background-repeat no-repeat
      background-size 100% 100%
      overflow hidden
      .avt_box
        margin-top 20px
        overflow hidden
        .pic_box
          width 50%
          float left
          text-align right
          padding-right 5px
          box-sizing border-box
          .radius_box
            display inline-block
            width 40px
            height 40px
            border-radius 50%
            overflow hidden
            border 1px solid #fff
            a
              display inline-block
              width 100%
              height 100%
              img
                display inline-block
                max-width 100%
                width 100%
                height auto
        .text_box
          width 50%
          float right
          text-align left
          padding-left 5px
          box-sizing border-box
          p
            font-size 14px
            color #fff
            line-height 40px
    .item_box
      position absolute
      width 90%
      left 50%
      top 80px
      transform translate(-50%,0)
      padding 15px 0
      background #fff
      border-radius 5px;
      box-shadow 0px 3px 40px 0px rgba(0,0,0,0.1)
      .van-col
        a
          display inline-block
          width 100%
          height 100%
          p
            line-height 25px
            text-align center
            &:first-child
              color #fe7b38
              font-size 12px
            &:last-child
              color #343434
              font-size 14px
    .own_manager,.own_tool,.own_other
      margin-top 50px
      background #fff
      .title
        line-height 45px
        margin-left 15px
        border-bottom 1px solid #e4e4e4
      .manager_box,.tool_box,.other_box
        padding 0 10px
        box-sizing border-box
        .van-row
          padding-bottom 10px
          .van-col
            text-align center
            a
              display inline-block
              width 100%
              height 100%
              .svg-icon
                width 22px
                height 30px
                color #353535
                margin 10px auto
              p
                font-size 12px
                color #333
        .banner
          padding-bottom 10px
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
    .own_tool,.own_other
      margin-top 10px
      .other_box
        .van-col
          &:first-child
            a
              .svg-icon
                width 18px
          &:nth-child(2)
            a
              .svg-icon
                width 18px
    .own_other
      margin-bottom 15px
</style>
