<template>
  <div>
    <div class="loan_register_3">
      <div class="logo_box">
        <!-- <img src="../../assets/images/step2_logo.png" alt="logo"> -->
      </div>
      <div class="form_box">
        <div class="title">
          <img src="../../assets/images/title5.png" alt="">
        </div>
        <div class="input_box">
          <van-row>
                <van-col span="18"><input type="tel" placeholder="请输入您的身份证号" maxlength="18" v-model="formdata.idcard"></van-col>
          </van-row>
        </div>
        <button type="button" class="next_btn" @click="submitform">提交申请</button>
      </div>
       <v-footer></v-footer>
    </div>
  </div>
</template>

<script>
import {Row, Col, Toast, Dialog} from 'vant'
import footer from '@/components/footer/index'
import registerApi from '@/api/register'
import { mapGetters } from 'vuex'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Toast.name]: Toast,
    [Dialog.name]: Dialog,
    'v-footer': footer
  },
  data () {
    return {
      formdata: {
        idcard: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      registerid: 'getregisterID'
    })
  },
  methods: {
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
    checkIdcard (value) {
      if (value.length === 0) {
        return true
      } else {
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
        var status = regIdCard.test(value)
        if (status) {
          if (value.length === 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 将前17位加权因子保存在数组里
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2] // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0 // 用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
              idCardWiSum += value.substring(i, i + 1) * idCardWi[i]
            }

            var idCardMod = idCardWiSum % 11 // 计算出校验码所在数组的位置
            var idCardLast = value.substring(17) // 得到最后一位身份证号码

            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod === 2) {
              if (idCardLast === 'X' || idCardLast === 'x') {
                // alert("恭喜通过验证啦！");
                return true
              } else {
                // alert("身份证号码错误！");
                return false
              }
            } else {
              // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if (idCardLast === idCardY[idCardMod].toString()) {
                // alert("恭喜通过验证啦！");
                return true
              } else {
                // alert("身份证号码错误！");
                return false
              }
            }
          }
        } else {
          // alert("身份证格式不正确!")
          return false
        }
      }
    },
    submitform () {
      if (this.formdata.idcard.length === 0) {
        this.myalert('请输入身份证号')
        return false
      } else {
        let res = this.checkIdcard(this.formdata.idcard)
        if (!res) {
          this.myalert('身份证号码格式错误')
          return false
        } else {
          this.formdata.id = this.registerid // 将注册返回的ID传入
          this.loading('努力提交中...')
          registerApi.step3(this.formdata).then((result) => {
            this.$toast.clear()
            this.$dialog.alert({
              title: '提交成功',
              message: '恭喜您提交成功，请等待客服与您联系'
            }).then(() => {
              this.$router.replace('/register')
            })
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loan_register_3
    height 100vh
    background url('../../assets/images/loan_bg.png') no-repeat center center
    background-size 100% 100%
    .logo_box
      width 21.73%
      padding 13px 0px 17px 17px
      img
        display inline-block
        max-width 100%
        width 100%
        height auto
    .form_box
      width 80%
      margin 0 auto
      border-radius 10px
      padding 15px
      background #fff
      box-shadow 0px 3px 40px 0px rgba(242,233,228,0.9)
      .title
        width 82%
        margin 18px auto
        img
          display inline-block
          max-width 100%
          width 100%
          height auto
      .input_box
        .van-row
          padding 10px
          background #f7f7f7
          border-radius 8px
          box-sizing border-box
          .van-col
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
        margin 30px auto 20px
        padding 10px 0
        background #f4b43f
        color #ffffff
        text-align center
        outline none
        font-size 18px
        border none
        border-radius 8px
    .loan_footer
      position absolute
      width 100%
      bottom 0
      background #fffefe
</style>
