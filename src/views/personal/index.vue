<template>
  <div class="personal-box">
    <p class="tip">温馨提示：您的信息将加密处理，请放心填写！</p>
    <div class="personal-rate">
      <p class="titlt">当前资料完整度</p>
      <p class="rate-num">{{rate}}%</p>
      <van-slider v-model="rate" bar-height="10px" disabled />
      <p class="tip_2">资料越完善下款成功率越高</p>
    </div>

    <div class="personal-data">
      <van-tabs v-model="active">
        <van-tab title="基本资料">
         <div class="personal-form">
           <van-cell-group>
             <van-field
                v-model="formdata.name"
                label="姓名"
                type="text"
                icon="clear"
                placeholder="请输入您的真实姓名"
                @click-icon="formdata.name = ''"
              >
             </van-field>
             <van-field
                v-model="formdata.sex"
                label="性别"
                placeholder="请选择"
                disabled
                @click.native="showsex"
              >
              <van-icon slot="icon" name="arrow" />
             </van-field>
             <van-field
                v-model="formdata.idcard"
                label="身份证号"
                type="tel"
                icon="clear"
                placeholder="请输入您的身份证号"
                maxlength="18"
                @click-icon="formdata.idcard = ''"
              >
             </van-field>
             <van-field
                v-model="formdata.phone"
                label="手机号"
                type="tel"
                maxlength="11"
                icon="clear"
                placeholder="请输入您的手机号"
                @click-icon="formdata.phone = ''"
              >
             </van-field>
             <van-field
                v-model="formdata.city[1].name"
                  label="所在城市"
                  placeholder="请选择常驻城市"
                  @click.native="showcity"
                  disabled
                >
                  <van-icon slot="icon" name="arrow" />
              </van-field>
             <van-field
                v-model="formdata.status"
                  label="婚姻状况"
                  @click.native="showstatus"
                  placeholder="请选择"
                  disabled
                >
                  <van-icon slot="icon" name="arrow" />
              </van-field>

              <van-field
                v-model="formdata.edu"
                  label="文化程度"
                  @click.native="showedu"
                  placeholder="请选择"
                  disabled
                >
                  <van-icon slot="icon" name="arrow" />
              </van-field>
           </van-cell-group>
            <button type="button" class="btn" @click="step1">下一步</button>
         </div>
        </van-tab>
        <van-tab title="身份信息" :disabled="item_2">
          <div class="personal-form">
           <van-cell-group>
             <van-field
              v-model="formdata.pay"
                label="月收入"
                @click.native="showpay"
                disabled
                placeholder="请选择"
              >
                <van-icon slot="icon" name="arrow" />
              </van-field>
             <van-field
              v-model="formdata.company"
                label="公司类型"
                @click.native="showcompany"
                disabled
                placeholder="请选择"
              >
                <van-icon slot="icon" name="arrow" />
              </van-field>
             <van-field
                v-model="formdata.job_age"
                label="工作年限"
                @click.native="showjobage"
                placeholder="请选择"
                disabled
              >
              <van-icon slot="icon" name="arrow" />
             </van-field>
             <van-field
              v-model="formdata.gongjijin"
                label="是否有公积金"
                @click.native="showgongj"
                disabled
                placeholder="请选择"
              >
                <van-icon slot="icon" name="arrow" />
              </van-field>
              <van-field
                v-model="formdata.shebao"
                  label="是否有社保"
                  @click.native="showshebao"
                  disabled
                  placeholder="请选择"
                >
                  <van-icon slot="icon" name="arrow" />
                </van-field>
           </van-cell-group>
            <button type="button" class="btn" @click="step2">下一步</button>
         </div>
        </van-tab>
        <van-tab title="资产信息" :disabled="item_3">
          <div class="personal-form">
           <van-cell-group>
            <van-field
              v-model="formdata.home"
                label="是否有房"
                @click.native="showhome"
                disabled
                placeholder="请选择"
              >
              <van-icon slot="icon" name="arrow" />
            </van-field>
            <van-field
              v-model="formdata.car"
                label="是否有车"
                @click.native="showcar"
                disabled
                placeholder="请选择"
              >
              <van-icon slot="icon" name="arrow" />
            </van-field>
            <van-field
              v-model="formdata.card"
                label="是否有信用卡"
                @click.native="showcard"
                disabled
                placeholder="请选择"
              >
              <van-icon slot="icon" name="arrow" />
            </van-field>
            <van-field
              v-model="formdata.overdue"
                label="是否有逾期"
                @click.native="showoverdue"
                disabled
                placeholder="请选择"
              >
              <van-icon slot="icon" name="arrow" />
            </van-field>
           </van-cell-group>
           <button type="button" class="btn" @click="step3">保存</button>
          </div>
        </van-tab>
      </van-tabs>
      <van-popup v-model="show_1" position="bottom">
                <van-picker
                  :columns="statusarr"
                  show-toolbar
                  title="婚姻状况"
                  @confirm="statusconfirm"
                  @cancel="statuscancel"
                />
      </van-popup>
      <van-popup v-model="show_2" position="bottom">
                <van-picker
                  :columns="eduarr"
                  show-toolbar
                  title="文化程度"
                  @confirm="educonfirm"
                  @cancel="educancel"
                />
      </van-popup>
      <van-popup v-model="show_3" position="bottom">
      <van-picker
        :columns="payarr"
        show-toolbar
        title="月收入"
        @confirm="payconfirm"
        @cancel="paycancel"
      />
    </van-popup>
    <van-popup v-model="show_4" position="bottom">
      <van-picker
        :columns="companyarr"
        show-toolbar
        title="公司类型"
        @confirm="companyconfirm"
        @cancel="companycancel"
      />
    </van-popup>
    <van-popup v-model="show_5" position="bottom">
      <van-picker
        :columns="jobagearr"
        show-toolbar
        title="工作年限"
        @confirm="jobageconfirm"
        @cancel="jobagecancel"
      />
    </van-popup>
    <van-popup v-model="show_6" position="bottom">
      <van-picker
        :columns="timearr"
        show-toolbar
        title="是否有公积金"
        @confirm="gongjconfirm"
        @cancel="gongjcancel"
      />
    </van-popup>
    <van-popup v-model="show_7" position="bottom">
      <van-picker
        :columns="timearr"
        show-toolbar
        title="是否有社保"
        @confirm="shebaoconfirm"
        @cancel="shebaocancel"
      />
    </van-popup>
    <van-popup v-model="show_8" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有房"
        @confirm="homeconfirm"
        @cancel="homecancel"
      />
    </van-popup>
    <van-popup v-model="show_9" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有车"
        @confirm="carconfirm"
        @cancel="carcancel"
      />
    </van-popup>
    <van-popup v-model="show_10" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有信用卡"
        @confirm="cardconfirm"
        @cancel="cardcancel"
      />
    </van-popup>
    <van-popup v-model="show_11" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有逾期"
        @confirm="overdueconfirm"
        @cancel="overduecancel"
      />
    </van-popup>
    <van-popup v-model="show_12" position="bottom">
      <van-picker
        :columns="sexarr"
        show-toolbar
        title="性别"
        @confirm="sexconfirm"
        @cancel="sexcancel"
      />
    </van-popup>
    <van-popup v-model="show_13" position="bottom">
      <van-area :area-list="areaList"
      :columns-num="2"
      title="选择城市"
      @confirm="cityconfirm"
      @cancel="citycancel"
      />
    </van-popup>
    </div>
  </div>
</template>

<script>
import { Slider, Tab, Tabs, CellGroup, Field, Popup, Picker, Icon, Toast, Area } from 'vant'
import personalApi from '@/api/personal'
import { mapGetters } from 'vuex'
import area from '../../assets/js/area.js'
export default {
  components: {
    [Slider.name]: Slider,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Area.name]: Area
  },
  data () {
    return {
      rate: 0,
      active: 0,
      formdata: {
        name: '',
        sex: '',
        idcard: '',
        phone: '',
        city: [{}, {code: '', name: ''}],
        status: '',
        edu: '',
        pay: '',
        company: '',
        job_age: '',
        gongjijin: '',
        shebao: '',
        home: '',
        car: '',
        card: '',
        overdue: ''
      },
      item_2: true,
      item_3: true,
      statusarr: ['已婚', '未婚'],
      companyarr: ['事业单位', '普通企业', '其他'],
      eduarr: ['初中', '高中', '大专', '本科', '硕士', '博士'],
      payarr: ['0~5000元', '5000~20000元', '20000元以上'],
      wayarr: ['银行代发', '公司转账', '现金发放', '自由收入'],
      jobagearr: ['不足3个月', '4~6个月', '7~12个月', '1~3年', '4~10年', '10年以上'],
      timearr: ['六个月以上', '六个月以下'],
      selectarr: ['是', '否'],
      sexarr: ['男', '女'],
      areaList: area,
      show_1: false,
      show_2: false,
      show_3: false,
      show_4: false,
      show_5: false,
      show_6: false,
      show_7: false,
      show_8: false,
      show_9: false,
      show_10: false,
      show_11: false,
      show_12: false,
      show_13: false
    }
  },
  computed: {
    ...mapGetters({
      user_info: 'user_info'
    })
  },
  methods: {
    showstatus () {
      this.show_1 = true
    },
    showedu () {
      this.show_2 = true
    },
    showpay () {
      this.show_3 = true
    },
    showcompany () {
      this.show_4 = true
    },
    showjobage () {
      this.show_5 = true
    },
    showshebao () {
      this.show_7 = true
    },
    showgongj () {
      this.show_6 = true
    },
    showhome () {
      this.show_8 = true
    },
    showcar () {
      this.show_9 = true
    },
    showcard () {
      this.show_10 = true
    },
    showoverdue () {
      this.show_11 = true
    },
    showsex () {
      this.show_12 = true
    },
    showcity () {
      this.show_13 = true
    },
    cityconfirm (value, index) {
      if (value[1].code === '-1') {
        return false
      }
      this.formdata.city = value
      this.show_13 = false
    },
    sexconfirm (value, index) {
      this.formdata.sex = value
      this.show_12 = false
    },
    overdueconfirm (value, index) {
      this.formdata.overdue = value
      this.show_11 = false
    },
    cardconfirm (value, index) {
      this.formdata.card = value
      this.show_10 = false
    },
    carconfirm (value, index) {
      this.formdata.car = value
      this.show_9 = false
    },
    homeconfirm (value, index) {
      this.formdata.home = value
      this.show_8 = false
    },
    gongjconfirm (value, index) {
      this.formdata.gongjijin = value
      this.show_6 = false
    },
    shebaoconfirm (value, index) {
      this.formdata.shebao = value
      this.show_7 = false
    },
    jobageconfirm (value, index) {
      this.formdata.job_age = value
      this.show_5 = false
    },
    companyconfirm (value, index) {
      this.formdata.company = value
      this.show_4 = false
    },
    payconfirm (value, index) {
      this.formdata.pay = value
      this.show_3 = false
    },
    statusconfirm (value, index) {
      this.formdata.status = value
      this.show_1 = false
    },
    statuscancel (value, index) {
      this.show_1 = false
    },
    educonfirm (value, index) {
      this.formdata.edu = value
      this.show_2 = false
    },
    educancel (value, index) {
      this.show_2 = false
    },
    paycancel (value, index) {
      this.show_3 = false
    },
    companycancel (value, index) {
      this.show_4 = false
    },
    jobagecancel (value, index) {
      this.show_5 = false
    },
    shebaocancel (value, index) {
      this.show_7 = false
    },
    homecancel (value, index) {
      this.show_8 = false
    },
    carcancel (value, index) {
      this.show_9 = false
    },
    cardcancel (value, index) {
      this.show_10 = false
    },
    overduecancel (value, index) {
      this.show_11 = false
    },
    sexcancel (value, index) {
      this.show_12 = false
    },
    citycancel (value, index) {
      this.show_13 = false
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
    step1 () {
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
      if (this.formdata.sex.length === 0) {
        this.myalert('请选择性别')
        return false
      }
      if (this.formdata.idcard.length === 0) {
        this.myalert('请输入身份证号')
        return false
      } else {
        let res = this.checkIdcard(this.formdata.idcard)
        if (!res) {
          this.myalert('身份证号码格式错误')
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
      if (this.formdata.city[1].name.length === 0) {
        this.myalert('请选择所在地')
        return false
      }
      if (this.formdata.status.length === 0) {
        this.myalert('请选择婚姻状况')
        return false
      }
      if (this.formdata.edu.length === 0) {
        this.myalert('请选择文化程度')
        return false
      } else {
        this.$set(this.formdata, 'openid', this.user_info.openid)
        this.$set(this.formdata, 'wxname', this.user_info.nickname)
        personalApi.step1(this.formdata).then((res) => {
          if (res.data.status === 200) {
            this.active = 1
            this.item_2 = false
            if (this.formdata.pay === '' && this.formdata.company === '' && this.formdata.job_age === '' && this.formdata.gongjijin === '' && this.formdata.shebao === '') {
              let s = setInterval(() => {
                this.rate = this.rate + 1
                if (this.rate === 44) {
                  clearInterval(s)
                }
              }, 10)
            }
          }
          if (res.data.status === 400) {
            this.active = 1
            this.item_2 = false
          }
        }).catch((err) => {
          if (err) {
            this.myalert('网络请求错误，请稍后再试')
          }
        })
      }
    },
    step2 () {
      if (this.formdata.pay.length === 0) {
        this.myalert('请选择月收入范围')
        return false
      }
      if (this.formdata.company.length === 0) {
        this.myalert('请选择公司类型')
        return false
      }
      if (this.formdata.job_age.length === 0) {
        this.myalert('请选择工作年限')
        return false
      }
      if (this.formdata.gongjijin.length === 0) {
        this.myalert('请选择是否有公积金')
        return false
      }
      if (this.formdata.shebao.length === 0) {
        this.myalert('请选择是否有社保')
        return false
      } else {
        this.formdata.id = this.user_info.openid // 根据openid修改信息
        personalApi.step2(this.formdata).then((result) => {
          if (result.data.status === 200) {
            this.active = 2
            this.item_3 = false
            if (this.formdata.home === '' && this.formdata.car === '' && this.formdata.card === '' && this.formdata.overdue === '') {
              if (this.rate !== 75) {
                let s = setInterval(() => {
                  this.rate = this.rate + 1
                  if (this.rate === 75) {
                    clearInterval(s)
                  }
                }, 10)
              }
            }
          }
        })
      }
    },
    step3 () {
      if (this.formdata.home.length === 0) {
        this.myalert('请选择是否有房')
        return false
      }
      if (this.formdata.car.length === 0) {
        this.myalert('请选择是否有车')
        return false
      }
      if (this.formdata.card.length === 0) {
        this.myalert('请选择是否有信用卡')
        return false
      }
      if (this.formdata.overdue.length === 0) {
        this.myalert('请选择是否有逾期')
        return false
      } else {
        this.formdata.id = this.user_info.openid // 根据openid修改信息
        personalApi.step3(this.formdata).then((result) => {
          if (result.data.status === 200) {
            this.active = 2
            if (this.rate !== 100) {
              let s = setInterval(() => {
                this.rate = this.rate + 1
                if (this.rate === 100) {
                  clearInterval(s)
                }
              }, 10)
            }
          }
        })
      }
    },
    gongjcancel (value, index) {
      this.show_6 = false
    },
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
    setrate () {
      let n = 0
      for (const i in this.formdata) {
        if (i !== 'id') {
          if (this.formdata[i] !== '') {
            n = n + 1
            let s = n / 16
            console.log(i)
            this.rate = s.toFixed(2) * 100
          }
        }
      }
    },
    getonelist (id) {
      personalApi.getonelist(id).then((res) => {
        if (res.data.onelist.length !== 0) {
          this.formdata.name = res.data.onelist[0].name
          this.formdata.sex = res.data.onelist[0].sex
          this.formdata.idcard = res.data.onelist[0].idcard
          this.formdata.phone = res.data.onelist[0].phone
          let cityarr = res.data.onelist[0].city.split(' ')
          this.formdata.city[1].name = cityarr[1]
          this.formdata.status = res.data.onelist[0].sex
          this.formdata.edu = res.data.onelist[0].edu
          this.formdata.pay = res.data.onelist[0].pay
          this.formdata.company = res.data.onelist[0].company
          this.formdata.job_age = res.data.onelist[0].job_age
          this.formdata.gongjijin = res.data.onelist[0].gongjijin
          this.formdata.shebao = res.data.onelist[0].shebao
          this.formdata.home = res.data.onelist[0].home
          this.formdata.car = res.data.onelist[0].car
          this.formdata.card = res.data.onelist[0].card
          this.formdata.overdue = res.data.onelist[0].overdue
          this.setrate()
          if (this.formdata.edu !== '') {
            this.item_1 = true
          }

          if (this.formdata.shebao !== '') {
            this.item_2 = true
          }
        }
      })
    }
  },
  mounted () {
    if (this.user_info.openid) {
      let obj = {
        id: this.user_info.openid
      }
      this.getonelist(obj)
      this.formdata.id = this.user_info.openid // 将注册返回的ID传入
      // this.button1 = true // 防止重复提交
    }
  },
  watch: {
    'active': {
      handler () {
      }
    },
    immediate: true
  }
}
</script>

<style lang="stylus" scoped>
  .personal-box
    .tip
      width 100%
      height 37px
      background #fff7ea
      text-align center
      color #ffc568
      line-height 37px
      font-size 14px
    .personal-rate
      padding 15px 0
      box-sizing border-box
      width 100%
      height 110px
      background #fff
      p
        text-align center
      p.title
        color #333333
      p.rate-num
        padding 10px 0
        color #8c8c8c
      p.tip_2
        margin-top 10px
        font-size 12px
        color #8c8c8c
    .van-slider
      width 60%
      margin 0 auto
    .personal-data
      margin-top 12px
      .personal-form
        margin-top 12px
    .van-slider--disabled
      opacity 1
  .btn
    display block
    width 85%;
    margin 20px auto 10px
    padding 10px 0
    background -webkit-linear-gradient(bottom, #e76118 20%, #f29626)
    border none
    border-radius 8px
    color #fff
    outline none
</style>
