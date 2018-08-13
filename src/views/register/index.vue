<template>
<scroll ref="scroll" class="wrapper"
      :bounce="{top: false}">
  <div class="loan_register">
    <div class="banner_register">
      <div class="banner">
        <img src="../../assets/images/wz.png" alt="banner">
      </div>
      <div class="register">
        <div class="title_box"><img src="../../assets/images//title.png"></div>
        <div class="form_box">
          <ul>
            <li>
              <van-row>
                <van-col span="13"><input type="text" placeholder="请输入您的姓名" v-model="formdata.name"></van-col>
                 <van-col span="10" offset="1" class="sex_box">
                   <input type="radio" id="man" name="sex" value="M" v-model="formdata.sex">
                   <label for="man" class="sex man">男</label>
                    <input type="radio" id="woman" name="sex" value="F" v-model="formdata.sex">
                   <label for="woman" class="sex woman">女</label>
                 </van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="18"><input type="tel" placeholder="请输入贷款金额" v-model="formdata.money"></van-col>
                 <van-col span="5" offset="1" class="danwei">
                   元
                 </van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="24"><input type="tel" placeholder="请正确输入手机号以便接受下款通知" maxlength="11" v-model="formdata.phone"></van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="13"><input type="tel" placeholder="请输入验证码" maxlength="4" v-model="formdata.code"></van-col>
                <van-col span="10" offset="1" class="get_btn_box">
                  <button type="button" class="btn_code" :disabled="isdisabled" @click="getcode">{{btn_text}}</button>
                </van-col>
              </van-row>
            </li>
            <li class="xieyi">
              <van-checkbox v-model="checked">我已仔细阅读并接受</van-checkbox>
              <router-link to="/clause" class="set_color">《服务条款》</router-link>
            </li>
            <li>
              <button type="button" class="next_btn" @click="submitform">下一步</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="item_container">
      <div class="advantage">
        <div class="adv_title">
          <img src="../../assets/images/title2.png" alt="我们的优势">
        </div>
        <div class="adv_item_box">
          <ul>
            <li>
              <van-row>
                <van-col span="6">
                  <svg-icon icon-class="adv_item1"></svg-icon>
                </van-col>
                <van-col span="18">
                  <h1>智能分析系统</h1>
                  <p>优先匹配合适的贷款平台</p>
                </van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="6">
                  <svg-icon icon-class="adv_item2"></svg-icon>
                </van-col>
                <van-col span="18">
                  <h1>多家借款平台</h1>
                  <p>众多优质借款平台可供选择</p>
                </van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="6">
                  <svg-icon icon-class="adv_item3"></svg-icon>
                </van-col>
                <van-col span="18">
                  <h1>借款额度高</h1>
                  <p>最高可借20万</p>
                </van-col>
              </van-row>
            </li>
            <li>
              <van-row>
                <van-col span="6">
                  <svg-icon icon-class="adv_item4"></svg-icon>
                </van-col>
                <van-col span="18">
                  <h1>资质审核快</h1>
                  <p>系统自动审核，最快30分钟下款</p>
                </van-col>
              </van-row>
            </li>
          </ul>
        </div>
      </div>
      <div class="scene">
        <div class="scene_title">
          <img src="../../assets/images/title3.png" alt="">
        </div>
        <div class="scene_box">
          <img src="../../assets/images/scene.png" alt="">
        </div>
      </div>

      <div class="org">
        <div class="org_title">
          <img src="../../assets/images/title4.png" alt="">
        </div>
        <div class="org_box">
          <ul>
            <li>
              <img src="../../assets/images/org_item1.png" alt="360借条">
            </li>
            <li>
              <img src="../../assets/images/org_item2.png" alt="平安普惠">
            </li>
            <li>
              <img src="../../assets/images/org_item3.png" alt="宜人贷">
            </li>
            <li>
              <img src="../../assets/images/org_item4.png" alt="新浪借条">
            </li>
            <li>
              <img src="../../assets/images/org_item5.png" alt="融360">
            </li>
            <li>
              <img src="../../assets/images/org_item6.png" alt="拍拍贷">
            </li>
          </ul>
        </div>
      </div>
      <v-footer></v-footer>
    </div>
  </div>
</scroll>
</template>

<script>
import {Row, Col, Checkbox, Toast} from 'vant'
import footer from '@/components/footer/index'
import registerApi from '@/api/register'
import { mapActions } from 'vuex'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Checkbox.name]: Checkbox,
    [Toast.name]: Toast,
    'v-footer': footer
  },
  data () {
    return {
      formdata: {
        name: '',
        sex: 'M',
        money: '',
        phone: '',
        code: ''
      },
      checked: true,
      btn_text: '获取验证码',
      isdisabled: false,
      id: '' // 用户第一步提交返回的id
    }
  },
  methods: {
    ...mapActions({
      setregisterid: 'setregisterid'
    }),
    myalert (msg) {
      this.$toast({position: 'top', message: msg})
    },
    loading (textmsg) {
      this.$toast.loading({
        mask: true,
        duration: 1500,
        message: textmsg
      })
    },
    submitform () {
      if (this.checked !== true) {
        this.myalert('请阅读并同意用户协议')
        return false
      }
      if (this.formdata.name.length === 0) {
        this.myalert('请填写姓名')
        return false
      } else {
        let namereg = /^[\u4e00-\u9fa5]{2,6}$/
        let res = namereg.test(this.formdata.name)
        if (!res) {
          this.myalert('请填写2-6位中文姓名')
          return false
        }
      }
      if (this.formdata.money.length === 0) {
        this.myalert('请填写贷款金额')
        return false
      } else {
        let iscarsh = /^\+?[1-9][0-9]*$/
        let res = iscarsh.test(this.formdata.money)
        if (!res) {
          this.myalert('请填写正确贷款金额')
          return false
        }
        if (this.formdata.money > 1000000) {
          this.myalert('对不起，最高可贷100万')
          return false
        }
      }
      if (this.formdata.phone.length === 0) {
        this.myalert('请填写手机号')
        return false
      } else {
        let isphone = /^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9])\d{8}$/
        let res = isphone.test(this.formdata.phone)
        if (!res) {
          this.myalert('请填写正确手机号')
          return false
        }
      }
      if (this.formdata.code.length === 0) {
        this.myalert('请填写验证码')
        return false
      } else {
        let iscode = /^[0-9]{4}$/
        let res = iscode.test(this.formdata.code)
        if (!res) {
          this.myalert('请输入正确的数字验证码')
          return false
        }
        this.loading('加载中...')
        registerApi.step1(this.formdata).then((res) => {
          if (res.data.status === 200) {
            this.$toast.clear()
            this.setregisterid(res.data.id)
            this.$router.replace('/registertwo')
          }
          if (res.data.status === -100) {
            this.myalert(res.data.message)
          }
        }).catch((err) => {
          if (err) {
            this.myalert('网络请求错误，请稍后再试')
          }
        })
      }
    },
    getcode () {
      let reg = /^(13[0-9]|14[5|7]|15[0-9]|17[0-9]|18[0-9])\d{8}$/
      if (this.formdata.phone === '') {
        this.myalert('请填写手机号')
        return false
      } else {
        let res = reg.test(this.formdata.phone)
        if (!res) {
          this.myalert('手机号格式有误')
          return false
        } else {
          let obj = {
            phone: this.formdata.phone
          }
          registerApi.getcode(obj).then((res) => {
            if (parseInt(res.data.code) === 0) {
              this.myalert('验证码发送成功')
              let n = 30
              let t = setInterval(() => {
                n--
                this.btn_text = n + 's'
                this.isdisabled = true
                if (n === 0) {
                  this.btn_text = '获取验证码'
                  this.isdisabled = false
                  clearInterval(t)
                  n = 30
                }
              }, 1000)
            }
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    height 100vh
  .banner_register
    background url('../../assets/images/bg.png') no-repeat center center
    background-size 100% 100%
    padding-bottom: 25px;
    .banner
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
    .register
      width 85%
      margin 0 auto
      padding 20px 10px
      background #ffffff
      border-radius 10px
      overflow hidden
      box-shadow 0px 3px 40px 0px rgba(0,0,0,0.1)
      .title_box
        position relative
        width 55%
        margin 0 auto
        text-align center
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
        &:before
          position absolute
          top 50%
          left -20px
          transform translate(-50%,0)
          content ''
          width 22px
          height 2px
          background #666666
        &:after
          position absolute
          top 50%
          right -40px
          transform translate(-50%,0)
          content ''
          width 22px
          height 2px
          background #666666
      .form_box
        margin-top 15px
        ul
          li
            margin-top 10px
            .van-row
              padding 10px
              background #f7f7f7
              border-radius 8px
              box-sizing border-box
              .van-col.sex_box
                position relative
                height 24px
              .van-col.danwei
                text-align center
                font-size 14px
                line-height 23px
              .van-col.get_btn_box
                text-align right
              .van-col
                .sex
                  position absolute
                  display inline-block
                  width 43px
                  height 24px
                  border-radius 5px
                  background #8d8d8d
                  color #ffffff
                  text-align center
                  line-height 25px
                  font-size 14px
                .btn_code
                  display inline-block
                  width 75%
                  border none
                  height 25px
                  background #f4b43f
                  outline none
                  font-size 12px
                  color #fff
                  margin-right 10px
                  border-radius 5px
                #man,#woman
                  display none
                  &:checked + label
                    background #f4b43f
                .man
                  left 20px
                .woman
                  right 10px
              input[type="text"],input[type="tel"]
                display inline-block
                border none
                background #f7f7f7
                width 100%
                &::-webkit-input-placeholder
                  color #a1a1a1
                  font-size 14px
                  padding-left 8px
                  line-height 23px
            .next_btn
              display block
              width 80%
              margin 15px auto 0
              padding 10px 0
              background #f4b43f
              color #ffffff
              text-align center
              outline none
              font-size 18px
              border none
              border-radius 8px
          li.xieyi
            font-size 14px
            text-align center
            .set_color
              color #f4b43f
            .van-checkbox
              display inline
  .item_container
    background url('../../assets/images/gezi_bg.png') center center
    background-size 18px 18px
    .advantage
      overflow hidden
      .adv_title
        width 40.5%
        margin 20px auto 0
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
      .adv_item_box
        width 80%
        margin 0 auto
        ul
          li
            margin-top 10px
            .van-col
              .svg-icon
                width 40px
                height 35px
                color #fff
              &:first-child
                padding 10px 0
                height 55px
                text-align center
              &:last-child
                padding 10px 0px 10px 20px
                background #f5eee9
                height 55px
                h1
                  font-size 15px
                  color #333
                  font-weight bold
                  line-height 19px
                p
                  font-size 14px
                  color #666
                  line-height 19px
            &:first-child
              .van-col
                &:first-child
                  background -webkit-linear-gradient(top, #e6ba51 50%, #e78828)
            &:nth-child(2)
              .van-col
                &:first-child
                   background -webkit-linear-gradient(top, #e87c3f 50%, #e75d3b)
            &:nth-child(3)
              .van-col
                &:first-child
                   background -webkit-linear-gradient(top, #e65f3e 20%, #9849c1)
            &:last-child
              .van-col
                &:first-child
                   background -webkit-linear-gradient(top, #9549cb 20%, #4434cd)
    .scene
      margin-top 40px
      .scene_title
        width 48.8%
        margin 0 auto
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
      .scene_box
        width 80%
        margin 10px auto 0
        font-size 0
        box-shadow 0px 3px 40px 0px rgba(242,233,228,0.9)
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
    .org
      margin-top 40px
      .org_title
        width 32.5%
        margin 0 auto
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
      .org_box
        width calc(80% +10px)
        margin 0 auto
        ul
          overflow hidden
          li
            float left
            width calc(33.333333333% - 10px)
            padding 0 5px
            margin-top 10px
            img
              display inline-block
              max-width 100%
              width 100%
              height auto
@media (max-width 360px)
  .banner_register
    .register
      .form_box
        ul
          li
            .van-row
              .van-col
                .man
                  left 10px
                .woman
                  right 10px
  .item_container
    .advantage
      .adv_item_box
        ul
          li
            .van-col
              &:last-child
                h1
                  font-size 14px
                p
                  font-size 12px
@media (max-width 320px)
  .banner_register
    .register
      .form_box
        ul
          li
            .van-row
              .van-col
                .man
                  left 10px
                .woman
                  right 0px
  .item_container
    .advantage
      .adv_item_box
        ul
          li
            .van-col
              &:last-child
                padding: 10px 0px 10px 10px;

</style>
