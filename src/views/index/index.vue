<template>
<scroll ref="scroll" class="wrapper"
      :bounce="{top: false}">
  <div>
    <v-swiper :bannerlist="bannerobj"></v-swiper>
    <div class="nav-box">
      <van-row>
        <van-col span="6" v-show="false">
          <router-link to="/mylimti">
            <div class="item">
              <img src="../../assets/images/icon1.png">
            </div>
            <p>授信额度</p>
          </router-link>
        </van-col>
        <van-col span="8">
           <router-link to="/register">
              <div class="item">
                <img src="../../assets/images/icon2.png">
              </div>
              <p>贷款申请</p>
           </router-link>
        </van-col>
        <van-col span="8">
           <router-link to="/calculator">
              <div class="item">
                <img src="../../assets/images/icon3.png">
              </div>
              <p>还款计算</p>
           </router-link>
        </van-col>
        <van-col span="8">
           <router-link to="/newgift">
              <div class="item">
                <img src="../../assets/images/icon4.png">
              </div>
              <p>新人礼包</p>
           </router-link>
        </van-col>
      </van-row>
    </div>

    <div class="tip">
      <van-notice-bar
        :text="tip_text"
        :left-icon="tip_icon"
        background="#fff"
        color="#383838"
      />
    </div>

    <div class="loan">
      <div class="title">
        <h1>贷款专区 <router-link to="/loan/list"><svg-icon icon-class="right"></svg-icon></router-link></h1>
      </div>
      <div class="loan_banner" v-for="(item, index) in advlist" :key="index" v-show="item.cate === 'loan'">
        <a :href="item.url">
          <img :src="baseimgurl + item.imgurl" :alt="item.des">
        </a>
      </div>
      <div class="loan_item_box">
        <van-row>
          <van-col span="12" class="item_box" v-for="(item, index) in loan_obj" :key="index" @click.native="laonviewhistory(item._id)">
            <a :href="item.url">
            <div class="item">
              <van-row>
                <van-col class="loan_left" span="14">
                  <p>{{item.des}}</p>
                </van-col>
                <van-col class="loan_right" span="9" offset="1">
                  <img :src="baseimgurl + item.imgurl">
                  <p>{{item.title}}</p>
                </van-col>
              </van-row>
            </div>
            </a>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="credit">
      <div class="title">
        <h1>信用卡专区<router-link to="/card/list"><svg-icon icon-class="right"></svg-icon></router-link></h1>
      </div>
      <div class="credit_banner" v-for="(item, index) in advlist" :key="index" v-show="item.cate === 'card'">
        <a :href="item.url">
          <img :src="baseimgurl + item.imgurl" :alt="item.des">
        </a>
      </div>
      <div class="credit_item_box">
        <van-row>
          <van-col span="12" class="item_box" v-for="(item, index) in credit_obj" :key="index" @click.native="cardviewhistory(item._id)">
            <a :href="item.url">
            <div class="item">
              <van-row>
                <van-col class="credit_left" span="16">
                  <p class="card_name">{{item.title|dessub}}</p>
                  <p>{{item.des|dessub}}</p>
                </van-col>
                <van-col class="credit_right" span="7" offset="1">
                  <img :src="baseimgurl + item.imgurl" alt="" class="card_pic">
                </van-col>
              </van-row>
            </div>
            </a>
          </van-col>
        </van-row>
      </div>
    </div>

    <v-logo></v-logo>
  </div>
</scroll>
</template>

<script>
import Cookies from 'js-cookie'
import { Row, Col, NoticeBar } from 'vant'
import logo from '@/components/logo/index'
import swiper from '@/components/swiper/index'
import indexApi from '@/api/index'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [NoticeBar.name]: NoticeBar,
    'v-logo': logo,
    'v-swiper': swiper
  },
  data () {
    return {
      baseimgurl: process.env.BASE_API,
      tip_icon: require('../../assets/images/tip_icon.png'),
      tip_text: '132XXXX2343于3分钟前申请10万元贷款已成功下款。' +
                '132XXXX2343于3分钟前申请10万元贷款已成功下款。' +
                '132XXXX2343于3分钟前申请10万元贷款已成功下款。',
      bannerobj: [],
      loan_obj: [],
      credit_obj: [],
      advlist: []
    }
  },
  methods: {
    init () {
      this.$loading()
      indexApi.init().then((res) => {
        if (res.data.status === 200) {
          this.$loading.end()
          this.bannerobj = res.data.data.bannerlist
          this.loan_obj = res.data.data.loanlist
          this.credit_obj = res.data.data.cardlist
          this.advlist = res.data.data.advlist
        }
      })
    },
    getloanlist () {
      indexApi.getloanlist().then((res) => {
        if (res.data.status === 200) {
          this.loan_obj = res.data.loanlist
        }
      })
    },
    getcardlist () {
      indexApi.getcardlist().then((res) => {
        if (res.data.status === 200) {
          this.credit_obj = res.data.cardlist
        }
      })
    },
    getbannerlist () {
      indexApi.getbannerlist().then((res) => {
        if (res.data.status === 200) {
          this.bannerobj = res.data.bannerlist
        }
      })
    },
    getadvlist () {
      indexApi.getadvlist().then((res) => {
        if (res.data.status === 200) {
          this.advlist = res.data.advlist
        }
      })
    },
    laonviewhistory (id) {
      let loanidarr = Cookies.get('laonviewhistory')
      if (loanidarr === undefined) {
        loanidarr = ''
        loanidarr += id
      } else {
        loanidarr += ',' + id
        console.log(loanidarr)
      }
      var maxAge = new Date(new Date().getTime() + 7 * 24 * 60 * 1000)
      Cookies.set('laonviewhistory', loanidarr, {
        expires: maxAge
      })
    },
    cardviewhistory (id) {
      let cardidarr = Cookies.get('cardviewhistory')
      if (cardidarr === undefined) {
        cardidarr = ''
        cardidarr += id
      } else {
        cardidarr += ',' + id
      }
      var maxAge = new Date(new Date().getTime() + 7 * 24 * 60 * 1000)
      Cookies.set('cardviewhistory', cardidarr, {
        expires: maxAge
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    height calc(100vh - 50px)
  .nav-box
    position relative
    z-index 999
    padding 10px 0 18px 0
    box-sizing border-box
    text-align center
    background-color #ffffff
    &:before
      position absolute
      top 0
      left 0
      transform translate(0,-50%)
      content ''
      width 100%
      height 15px
      background #ffffff
      border-radius 50%
      z-index 998
    .van-col
      a
        display inline-block
        width 100%
        height 100%
        .item
          margin 0 auto
          width 40px
          height 40px
          text-align center
          border-radius 50%
          line-height 40px
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
        p
          margin-top 7px
          font-size 12px
          color #282828
  .tip
    margin-top 12px
  .loan,.credit
    padding 10px
    box-sizing border-box
    margin-top 12px
    background-color #ffffff
    .title
      h1
        font-size 18px
        line-height 34px
        color #333333
        font-weight 400
        a
          color #333
          .svg-icon
            width 18px
            height 18px
            margin-top 8px
            float right
    .loan_banner,.credit_banner
      margin-top 10px
      width 100%
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
    .loan_item_box,.credit_item_box
      margin-top 10px
      .item_box
        &:nth-child(2n-1)
          .item
            margin-left 0
        &:nth-child(2n)
          .item
            margin-right 0
      .item
        position relative
        margin 3px 5px
        padding 5px
        box-sizing border-box
        border 1px solid #ececec
        .credit_left
          padding 10px 0
        .loan_left
          padding 10px 0
        .loan_left,.credit_left
          p
            font-size 12px
            color #565656
            line-height 16px
          p.card_name
            font-weight bold
        .credit_right
          position: absolute;
          top: 50%;
          right: 5px;
          transform: translate(0,-50%);
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
          p
            margin-top 3px
            font-size 12px
            color #565656
            text-align center
        .loan_right
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
          p
            margin-top 3px
            font-size 12px
            color #565656
            text-align center

  @media (max-width:320px)
    .loan_left
        padding 0!important
    .credit_left
      padding 0!important
</style>
