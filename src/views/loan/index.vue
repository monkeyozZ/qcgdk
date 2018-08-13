<template>
  <div class="loan_container">
    <van-tabs v-model="active" swipeable>
      <van-tab>
        <div slot="title" class="title">
          <img src="../../assets/images/you.png" class="title_icon">优质产品
        </div>
       <div class="item_box_1">
         <v-swiper :bannerlist="bannerobj"></v-swiper>
         <div class="select_box">
           <van-row>
              <van-col span="12" @click.native="showselectmoney">
                <svg-icon icon-class="loan_icon"></svg-icon>
                <span class="title-box">贷款金额 <svg-icon :icon-class="show_1?'down':'up'"></svg-icon></span>
              </van-col>
              <van-col span="12" @click.native="showselectstatus">
                <svg-icon icon-class="person"></svg-icon>
                <span class="title-box">你的身份 <svg-icon :icon-class="show_2?'down':'up'"></svg-icon></span>
              </van-col>
           </van-row>
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
                <li v-for="(item, index) in list_1_arr" :key="index" @click="laonviewhistory(item._id)">
                  <a :href="item.url">
                      <van-row>
                        <van-col span="5">
                          <img :src="baseimgurl + item.imgurl">
                          <p>{{item.title}}</p>
                        </van-col>
                        <van-col span="15" offset="1">
                          <h1 class="title">{{item.des}}</h1>
                          <p> <svg-icon icon-class="success"></svg-icon> 通过率：{{item.pass_rate}}%</p>
                          <p> <svg-icon icon-class="count"></svg-icon> 已有<span class="set_color">{{item.success_num}}</span>人成功下款</p>
                        </van-col>
                        <van-col span="2" offset="1">
                          <svg-icon icon-class="arrow"></svg-icon>
                        </van-col>
                      </van-row>
                  </a>
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
          <div class="money_card">
            <div class="money_box">
              <p class="num">{{money_num_status?repayarr[0].repaymentNum + '.00':'****'}}</p>
              <p class="text">今日应还（元）</p>
            </div>
            <svg-icon :icon-class="money_num_status?'eye':'eyedown'" @click.native="hidenum"></svg-icon>
          </div>
          <div class="list_box_2">
                <ul>
                    <li v-for="(item, index) in repayarr" :key="index">
                          <van-row>
                            <van-col span="5">
                              <img :src="baseimgurl + item.imgurl">
                              <p>{{item.title}}</p>
                              <p>({{item.hasrepaymentCount}}/{{item.repaymentCount}}期)</p>
                            </van-col>
                            <van-col span="14" offset="5" class="text_header">
                              <p><span >还款日</span>：{{item.repaymentDate}}</p>
                              <p><span>本期应还</span>：{{item.repaymentNum}}.00元</p>
                              <p><span>已还</span>：{{item.hasrepaymentMoney}}.00元</p>
                              <p><span>未还</span>：{{item.norepaymentMoney}}.00元</p>
                            </van-col>
                            <van-col span="2" offset="1">
                              <router-link :to="{path: '/creatbill', query: {id: item.id}}">
                                <svg-icon icon-class="arrow"></svg-icon>
                              </router-link>
                            </van-col>
                          </van-row>
                    </li>
                  </ul>
          </div>
        </div>
        <router-link to='/creatbill'>
          <button type="button" class="add" >新增账单</button>
        </router-link>
        <p class="add_tip" >添加账单提醒，还款日前一天将通过公众号提醒您还款</p>
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
import loanApi from '@/api/loan'
import { mapGetters } from 'vuex'
export default {
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
      filterarr: {
        money_limit: '',
        people_limit: ''
      },
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
    filtercase (obj) {
      loanApi.filtercase(obj).then((res) => {
        if (res.data.status === 200) {
          this.list_1_arr = res.data.loanlist
        }
      })
    },
    moneyonConfirm (value, index) {
      if (value === '0~8000元') {
        this.filterarr.money_limit = 1
        this.filtercase(this.filterarr)
      }
      if (value === '8000~20000元') {
        this.filterarr.money_limit = 2
        this.filtercase(this.filterarr)
      }
      if (value === '20000~80000元') {
        this.filterarr.money_limit = 3
        this.filtercase(this.filterarr)
      }
      if (value === '80000元以上') {
        this.filterarr.money_limit = 4
        this.filtercase(this.filterarr)
      }
      this.show_1 = false
    },
    moneyonCancel (value, index) {
      this.filterarr.money_limit = ''
      this.show_1 = false
    },
    statusonConfirm (value, index) {
      if (value === '上班族') {
        this.filterarr.people_limit = 1
        this.filtercase(this.filterarr)
      }
      if (value === '个体户') {
        this.filterarr.people_limit = 2
        this.filtercase(this.filterarr)
      }
      if (value === '学生') {
        this.filterarr.people_limit = 3
        this.filtercase(this.filterarr)
      }
      if (value === '自由职业者') {
        this.filterarr.people_limit = 4
        this.filtercase(this.filterarr)
      }
      this.show_2 = false
    },
    statusonCancel (value, index) {
      this.filterarr.status = ''
      this.show_2 = false
    },
    onPullingDown () { // 下拉刷新
      this.listQuery.page = 1
      loanApi.dropdown(this.filterarr).then((res) => {
        // console.log(res)
        if (res.data.status === 200) {
          this.list_1_arr = res.data.loanlist
        } else {
          this.$refs.scroll.forceUpdate()
        }
      })
    },
    onPullingUp () { // 上拉加载
      // 更新数据
      this.listQuery.page += 1
      let obj = {
        money_limit: this.filterarr.money_limit,
        people_limit: this.filterarr.people_limit,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }
      loanApi.pull(obj).then((res) => {
        if (res.data.status === 200) {
          res.data.loanlist.map((item) => {
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
      loanApi.Datainit().then((res) => {
        if (res.data.status === 200) {
          this.$loading.end()
          this.list_1_arr = res.data.data.loanlist
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
        this.getbill(this.user_info.openid)
      }
    },
    getbill (openid) {
      loanApi.getbill(openid).then((res) => {
        if (res.data.status === 200) {
          this.repayarr = res.data.billlist
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
            this.getbill(this.user_info.openid)
            this.$refs.item2.style.color = '#4d7bfe'
            document.getElementsByClassName('van-tabs__line')[0].style.backgroundColor = '#4d7bfe'
            document.getElementsByClassName('van-tabs__content')[0].style.marginTop = '0px'
          } else {
            this.$refs.item2.style.color = '#333333'
            document.getElementsByClassName('van-tabs__line')[0].style.backgroundColor = '#e75833'
            document.getElementsByClassName('van-tabs__content')[0].style.marginTop = '8px'
          }
        }, 1)
        // console.log(this.active)
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
  height calc(100vh - 253px)
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
    .select_box
      position relative
      padding 10px 0
      background #ffffff
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
        &:first-child
          border-right 1px solid #dddddd
        text-align center
        .title-box
          font-size 15px
          color #333
          line-height 16px
          .svg-icon
            color #000
  .list_box_1,.item_box_2
    ul
      li
        position relative
        margin-top 12px
        background #ffffff
        overflow hidden
        padding 18px 25px
        box-sizing border-box
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
            line-height 22px
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
              line-height 16px
          &:last-child
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
@media (max-width:320px)
  .loan_container
    .list_box_1
      ul
        li
          a
            padding 9px 10px
</style>
