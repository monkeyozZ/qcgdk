<template>
  <div class="loan_container">
    <van-tabs v-model="active" swipeable>
      <van-tab>
        <div slot="title" class="title">
          <img src="../../assets/images/you.png" class="title_icon">优质产品
        </div>
       <div class="item_box_1">
         <v-swiper :bannerlist="bannerobj"></v-swiper>
         <div class="radius_box">
         </div>
         <scroll ref="scroll" class="wrapper_1"
            :data="list_1_arr"
            :pullDownRefresh="pullDownRefreshObj"
            :pullUpLoad="pullUpLoadObj"
            :scrollbar="true"
            @pullingDown="onPullingDown"
            @pullingUp="onPullingUp">
            <div class="list_box_1">
              <ul>
                <li v-for="(item, index) in list_1_arr" :key="index">
                  <van-row>
                    <van-col span="11">
                      <img :src="baseimgurl + item.imgurl">
                    </van-col>
                    <van-col span="12" offset="1" class="last_box">
                      <h1 class="title">{{item.title}}</h1>
                      <p>{{item.des|sub}}</p>
                      <a :href="item.url">
                        <button type="button" class="apply_btn" @click="cardviewhistory(item._id)">立即申请</button>
                      </a>
                    </van-col>
                  </van-row>
                </li>
              </ul>
            </div>
         </scroll>
       </div>
      </van-tab>
      <van-tab>
        <div slot="title" class="title" ref="item2">
          <img src="../../assets/images/xing.png" class="title_icon">还款提醒
        </div>
      <scroll ref="scroll" class="wrapper_2"
              :scrollbar="true">
        <div class="item_box_2" v-if="Object.keys(repayarr).length !== 0">
          <div class="list_box_2">
                <ul>
                    <li v-for="(item, index) in repayarr" :key="index">
                          <van-row>
                            <van-col span="8">
                              <img :src="baseimgurl + item.imgurl">
                              <p>{{item.title}}</p>
                            </van-col>
                            <van-col span="12" offset="1" class="text_header">
                              <p class="card_title">今日出账</p>
                              <p><span>还款日</span>：{{item.repaymentDate}}</p>
                              <p><span>卡号后四位</span>：{{item.cardcode | subcode}}</p>
                            </van-col>
                            <van-col span="1" offset="1" class="arrow">
                              <router-link :to="{path: '/addcard', query: {id: item.id}}">
                                <svg-icon icon-class="arrow"></svg-icon>
                              </router-link>
                            </van-col>
                          </van-row>
                    </li>
                  </ul>
          </div>
        </div>
        <router-link to='/addcard'>
          <button type="button" class="add" >新增信用卡</button>
        </router-link>
        <p class="add_tip" >添加信用卡提醒，还款日前一天将通过公众号提醒您还款</p>
      </scroll>
      </van-tab>
    </van-tabs>

    <van-popup v-model="show_1" position="bottom">
      <van-picker
        show-toolbar
        :title="title"
        :columns="columns"
        @confirm="moneyonConfirm"
        @cancel="moneyonCancel"
      />
    </van-popup>
    <van-popup v-model="show_2" position="bottom">
      <van-picker
        show-toolbar
        :title="title"
        :columns="columns_2"
        @confirm="statusonConfirm"
        @cancel="statusonCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { Tab, Tabs, Row, Col, Popup, Picker } from 'vant'
import swiper from '@/components/swiper/index'
import cardApi from '@/api/card/index.js'
import {subcode} from '@/filters'
import { mapGetters } from 'vuex'
export default {
  filters: {
    subcode
  },
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Row.name]: Row,
    [Col.name]: Col,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    'v-swiper': swiper
  },
  data () {
    return {
      active: 0,
      show_1: false,
      show_2: false,
      title: '',
      columns: [],
      columns_2: [],
      listQuery: {
        page: 1,
        limit: 5
      },
      baseimgurl: process.env.BASE_API,
      bannerobj: [],
      money_num: '378,884.00',
      money_num_status: true,
      pullDownRefresh: true,
      pullDownRefreshTxt: '刷新成功',
      pullDownRefreshThreshold: 65,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadMoreTxt: '数据加载中',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      list_1_arr: [],
      repayarr: {}
    }
  },
  computed: {
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop),
        txt: this.pullDownRefreshTxt
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    },
    ...mapGetters({
      user_info: 'user_info'
    })
  },
  methods: {
    showselectmoney () {
      this.title = '贷款金额'
      this.columns = ['0~8000元', '8000~20000元', '20000~80000元', '80000元以上']
      this.show_1 = true
      this.money_icon = 'up'
    },
    showselectstatus () {
      this.title = '选择身份'
      this.columns_2 = ['上班族', '个体户', '学生', '自由职业者']
      this.show_2 = true
      this.status_icon = 'up'
    },
    moneyonConfirm (value, index) {
      this.filterarr.money = value
      this.show_1 = false
    },
    moneyonCancel (value, index) {
      this.filterarr.money = ''
      this.show_1 = false
    },
    statusonConfirm (value, index) {
      this.filterarr.status = value
      this.show_2 = false
    },
    statusonCancel (value, index) {
      this.filterarr.status = ''
      this.show_2 = false
    },
    onPullingDown () { // 下拉刷新
      this.listQuery.page = 1
      cardApi.dropdown(this.listQuery).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.list_1_arr = res.data.cardlist
        } else {
          this.$refs.scroll.forceUpdate()
        }
      })
    },
    onPullingUp () { // 上拉加载
      // 更新数据
      this.listQuery.page += 1
      cardApi.pull(this.listQuery).then((res) => {
        if (res.data.status === 200) {
          res.data.cardlist.map((item) => {
            this.list_1_arr = this.list_1_arr.concat(item)
          })
        } else {
          // console.log(this.$refs)
          this.$refs.scroll.forceUpdate()
        }
      })
    },
    rebuildScroll () {
      this.nextTick(() => {
        this.$refs.scroll.destroy()
        this.$refs.scroll.initScroll()
      })
    },
    initbaseData () {
      this.$loading()
      cardApi.Datainit().then((res) => {
        if (res.data.status === 200) {
          this.$loading.end()
          this.list_1_arr = res.data.data.cardlist
          this.bannerobj = res.data.data.bannerlist
        }
      })
    },
    hidenum () {
      this.money_num_status = !this.money_num_status
      localStorage.setItem('money_num_status', JSON.stringify(this.money_num_status))
    },
    selecteditem2 () {
      let category = this.$route.query.cate
      if (category === 'item2') {
        this.active = 1
        this.getcard(this.user_info.openid)
      }
    },
    getcard (openid) {
      cardApi.getcard(openid).then((res) => {
        if (res.data.status === 200) {
          this.repayarr = res.data.cardlist
        }
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
  watch: {
    pullDownRefreshObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    pullUpLoadObj: {
      handler () {
        this.rebuildScroll()
      },
      deep: true
    },
    active: {
      handler () {
        setTimeout(() => {
          if (this.active === 1) {
            this.getcard(this.user_info.openid)
            this.$refs.item2.style.color = '#4d7bfe'
            document.getElementsByClassName('van-tabs__line')[0].style.backgroundColor = '#4d7bfe'
            document.getElementsByClassName('van-tabs__content')[0].style.marginTop = '0px'
          } else {
            this.$refs.item2.style.color = '#333333'
            document.getElementsByClassName('van-tabs__line')[0].style.backgroundColor = '#e75833'
            document.getElementsByClassName('van-tabs__content')[0].style.marginTop = '8px'
          }
        }, 1)
        /* let doc = document.getElementsByClassName('van-tabs__line')
        console.log(doc) */
      },
      immediate: true
    }
  },
  mounted () {
    this.initbaseData()
    this.money_num_status = JSON.parse(localStorage.getItem('money_num_status'))
    this.selecteditem2()
  }
}
</script>

<style lang="stylus" scoped>
.wrapper_1
  height calc(100vh - 225px)
.wrapper_2
  height calc(100vh - 94px)
.loan_container
  .van-tab
    .title
      font-size 17px!important
      line-height 44px!important
      font-weight 700!important
      img
        width 16px
        margin-right 5px
        display inline-block
        vertical-align middle
  .item_box_1
    .radius_box
      position relative
      padding 4px 0
      background #f6f6f6
      &:before
        position absolute
        top 0
        left 0
        transform translate(0,-50%)
        content ''
        width 100%
        height 15px
        background #f6f6f6
        border-radius 50%
        z-index 998
  .list_box_1,.item_box_2
    ul
      li
        position relative
        margin-top 12px
        padding 18px 25px
        background #ffffff
        overflow hidden
        .van-col
          img
            display inline-block
            max-width 100%
            width 100%
            height auto
          .title
            color #333333
            font-size 15px
            margin-bottom 8px
            font-weight bold
          p
            font-size 12px
            line-height 25px
            color #333
            .svg-icon
              margin-right 5px
              width 14px
              height 14px
              color #858585
            .set_color
              color #e75833
          &:first-child
              p
                text-align center
                line-height 18px
                font-weight bold
        .last_box
          position relative
          a
            position absolute
            left 0
            bottom -38px
            display inline-block
            margin-top 4px
            .apply_btn
              padding 4px 15px
              font-size 14px
              text-align center
              border 1px solid #e75833
              border-radius 5px
              outline none
              color #e75833
              background #fff
        .arrow
          position absolute
          top 50%
          right 25px
          text-align right
          transform translate(0,-50%)
          .svg-icon
            color #e75833
        .text_header
            p
              text-align left
              span
                color #333
                font-weight bold
            .card_title
              color #333
              font-weight bold
              font-size 15px
      &:first-child
        margin-top 4px
  .item_box_2
    .money_card
      position relative
      width 85%
      height 120px
      background -webkit-linear-gradient(left, rgba(75,135,243,0.9) 30%, #3e71ec)
      margin 12px auto 0
      border-radius 7px
      text-align center
      .money_box
        position absolute
        width 80%
        top 50%
        left 50%
        transform translate(-50%, -50%)
        .num
          font-size 25px
          font-weight 700
          color #fff
          text-align center
        .text
          margin-top 15px
          font-size 16px
          color #f5f5f5
          text-align center
      .svg-icon
        position absolute
        top 25px
        right 30px
        color #fff
  .add
    display block
    width 85%;
    margin 20px auto 10px
    padding 10px 0
    background -webkit-linear-gradient(bottom, #e76118 20%, #f29626)
    border none
    border-radius 8px
    color #fff
    outline none
  .add_tip
    font-size 12px
    color #333
    text-align center
    padding-bottom 50px

@media (max-width:375px)
  .loan_container
    .list_box_1
      ul
        li
          .van-col
            p
              line-height 15px

@media (max-width:320px)
  .loan_container
    .list_box_1
      ul
        li
          .van-col
            p
              line-height 15px
            &:last-child
              a
                bottom -28px
                .apply_btn
                  padding 2px 8px
    .item_box_2
      ul
        li
          .van-col
            p
              line-height 22px
</style>
