<template>
  <div class="container">
    <div class="own_header">
    </div>
    <div class="nav_box">
          <van-tabs type="card" v-model="active">
            <van-tab>
              <div slot="title">等额本息</div>
              <div class="tab_box_1">
                <ul>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>贷款金额：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" v-model="calculator.money">元
                      </van-col>
                    </van-row>
                  </li>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>贷款期限：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" readonly v-model="calculator.month" @click="showselectmonth">月
                        <svg-icon :icon-class="show_1?'up':'down'"></svg-icon>
                      </van-col>
                    </van-row>
                  </li>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>综合月利率：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" v-model="calculator.rate">%
                      </van-col>
                    </van-row>
                  </li>
                </ul>
                <button type="button" class="btn" @click="calculator_1">立即计算</button>
              </div>
            </van-tab>
            <van-tab title="等额本金">
              <div slot="title">等额本金</div>
              <div class="tab_box_2">
                <ul>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>贷款金额：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" v-model="calculator.money">元
                      </van-col>
                    </van-row>
                  </li>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>贷款期限：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" readonly v-model="calculator.month" @click="showselectmonth">月
                        <svg-icon :icon-class="show_1?'up':'down'"></svg-icon>
                      </van-col>
                    </van-row>
                  </li>
                  <li>
                    <van-row>
                      <van-col span="10">
                        <label>综合月利率：</label>
                      </van-col>
                      <van-col span="14">
                        <input type="tel" v-model="calculator.rate">%
                      </van-col>
                    </van-row>
                  </li>
                </ul>
                <button type="button" class="btn" @click="calculator_2">立即计算</button>
              </div>
            </van-tab>
          </van-tabs>
    </div>
    <div class="item_box">
        <van-row>
          <van-col span="8">
            <p>{{item_1.num}}</p>
            <p>{{item_1.text}}（元）</p>
          </van-col>
          <van-col span="8">
            <p>{{item_2.num}}</p>
            <p>{{item_2.text}}（元）</p>
          </van-col>
          <van-col span="8">
            <p>{{item_3.num}}</p>
            <p>{{item_3.text}}（元）</p>
          </van-col>
        </van-row>
    </div>

    <van-popup v-model="show_1" position="bottom">
      <van-picker
        show-toolbar
        title="贷款期限"
        :columns="columns"
        @confirm="monthonConfirm"
        @cancel="monthonCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { Tab, Tabs, Row, Col, Popup, Picker, Toast } from 'vant'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast
  },
  data () {
    return {
      active: 0,
      show_1: false,
      columns: ['3个', '6个', '9个', '12个', '18个', '24个', '36个', '60个', '120个'],
      calculator: {
        money: '',
        month: '',
        rate: ''
      },
      item_1: {
        num: 0,
        text: '每月月供'
      },
      item_2: {
        num: 0,
        text: '总利息'
      },
      item_3: {
        num: 0,
        text: '本息总和'
      }
    }
  },
  methods: {
    showselectmonth () {
      this.show_1 = true
    },
    monthonConfirm (value, index) {
      this.calculator.month = value
      this.show_1 = false
    },
    monthonCancel (value, index) {
      this.calculator.month = ''
      this.show_1 = false
    },
    myalert (msg) {
      this.$toast({position: 'top', message: msg})
    },
    calculator_1 () {
      if (this.calculator.money.length === 0) {
        this.myalert('请填写贷款金额')
        return false
      } else {
        let reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
        if (!reg.test(this.calculator.money)) {
          this.myalert('请填正确贷款金额')
          return false
        }
      }

      if (this.calculator.month.length === 0) {
        this.myalert('请选择贷款期限')
        return false
      }

      if (this.calculator.rate.length === 0) {
        this.myalert('请填综合月利率')
        return false
      } else {
        let reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
        if (!reg.test(this.calculator.money)) {
          this.myalert('请填正确综合月利率')
          return false
        }
      }

      let money = parseFloat(this.calculator.money)
      let month = parseInt(this.calculator.month)
      let rate = parseFloat(this.calculator.rate) / 100
      console.log(money)
      let fz = money * rate * Math.pow(1 + rate, month)
      let fm = Math.pow(1 + rate, month) - 1
      this.item_1.num = Math.floor((fz / fm) * 100) / 100
      this.item_2.num = Math.floor(((month * this.item_1.num) - money) * 100) / 100
      this.item_3.num = Math.floor((money + this.item_2.num) * 100) / 100
    },
    calculator_2 () {
      if (this.calculator.money.length === 0) {
        this.$toast('请填写贷款金额')
        return false
      } else {
        let reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
        if (!reg.test(this.calculator.money)) {
          this.$toast('请填正确贷款金额')
          return false
        }
      }

      if (this.calculator.month.length === 0) {
        this.$toast('请选择贷款期限')
        return false
      }

      if (this.calculator.rate.length === 0) {
        this.$toast('请填综合月利率')
        return false
      } else {
        let reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
        if (!reg.test(this.calculator.money)) {
          this.$toast('请填正确综合月利率')
          return false
        }
      }
      let money = parseFloat(this.calculator.money)
      let month = parseInt(this.calculator.month)
      let rate = parseFloat(this.calculator.rate) / 100
      this.item_1.num = Math.floor(((money / month) * rate) * 100) / 100
      this.item_2.num = Math.floor(((((money / month) + (money * rate)) + money / month * (1 + rate)) / 2 * month - money)) * 100 / 100
      this.item_3.num = Math.floor((money + this.item_2.num) * 100) / 100
    }
  },
  watch: {
    active: {
      handler () {
        if (this.active === 1) {
          this.item_1.text = '每月递减'
        } else {
          this.item_1.text = '每月月供'
        }
        this.calculator.money = ''
        this.calculator.month = ''
        this.calculator.rate = ''
        this.item_1.num = 0
        this.item_2.num = 0
        this.item_3.num = 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  position relative
  .own_header
      width 100%
      height 125px
      background url('../../assets/images/own_header.png')
      background-repeat no-repeat
      background-size 100% 100%
      overflow hidden
  .nav_box
    position absolute
    width 100%
    top 20px
    left 50%
    transform translate(-50%,0)
    .van-tabs__content
      position absolute
      top 150px
      .tab_box_1,.tab_box_2
        ul
          li
            padding 10px 5px
            box-sizing border-box
            border-bottom 1px solid #eeeeee
            .van-col
              label
                line-height 25px
                font-weight bold
                font-size 14px
              input
                margin-right 5px
                width 80%
                border 1px solid #b2b2b2
                padding-left 8px
              &:first-child
                text-align left
              &:last-child
                position relative
                text-align right
                .svg-icon
                  position absolute
                  top 50%
                  right 15%
                  transform translate(0,-50%)
        .btn
          display block
          width 85%;
          margin 20px auto
          padding 10px 0
          background -webkit-linear-gradient(bottom, #e76118 20%, #f29626)
          border none
          border-radius 8px
          color #fff
          outline none
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
      p
        line-height 25px
        text-align center
        font-size 12px
        &:first-child
          color #fe7b38
        &:last-child
          color #343434
</style>
