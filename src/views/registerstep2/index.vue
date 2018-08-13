<template>
  <div>
    <div class="loan_register_2">
      <div class="logo_box">
        <!-- <img src="../../assets/images/step2_logo.png" alt="logo"> -->
      </div>
      <div class="form_box">
        <div class="title">
          <img src="../../assets/images/title5.png" alt="">
        </div>
        <van-cell-group>
          <van-field
          v-model="formdata.city[1].name"
            label="工作所在地"
            @click.native="showcity"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.company"
            label="所在公司性质"
            @click.native="showcompany"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.pay"
            label="月收入"
            @click.native="showpay"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.way"
            label="工资发放形式"
            @click.native="showway"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.status"
            label="婚姻状况"
            @click.native="showstatus"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.card"
            label="是否有信用卡"
            @click.native="showcard"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.car"
            label="是否有车"
            @click.native="showcar"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.home"
            label="是否有房"
            @click.native="showhome"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.shebao"
            label="是否有社保"
            @click.native="showshebao"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>

          <van-field
          v-model="formdata.gongjijin"
            label="是否有公积金"
            @click.native="showgongj"
            disabled
          >
            <van-icon slot="icon" name="arrow" />
          </van-field>
        </van-cell-group>
        <button type="button" class="next_btn" @click="submitform">下一步</button>
      </div>
      <v-footer></v-footer>
    </div>
    <van-popup v-model="show_1" position="bottom">
      <van-area :area-list="areaList"
      :columns-num="2"
      title="选择城市"
      @confirm="cityconfirm"
      @cancel="citycancel"
      />
    </van-popup>
    <van-popup v-model="show_2" position="bottom">
      <van-picker
        :columns="companyarr"
        show-toolbar
        title="所在公司性质"
        @confirm="companyconfirm"
        @cancel="companycancel"
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
        :columns="wayarr"
        show-toolbar
        title="工资发放形式"
        @confirm="wayconfirm"
        @cancel="waycancel"
      />
    </van-popup>
    <van-popup v-model="show_5" position="bottom">
      <van-picker
        :columns="statusarr"
        show-toolbar
        title="婚姻状况"
        @confirm="statusconfirm"
        @cancel="statuscancel"
      />
    </van-popup>
    <van-popup v-model="show_6" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有信用卡"
        @confirm="cardconfirm"
        @cancel="cardcancel"
      />
    </van-popup>
    <van-popup v-model="show_7" position="bottom">
      <van-picker
        :columns="selectarr"
        show-toolbar
        title="是否有车"
        @confirm="carconfirm"
        @cancel="carcancel"
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
        :columns="timearr"
        show-toolbar
        title="是否有社保"
        @confirm="shebaoconfirm"
        @cancel="shebaocancel"
      />
    </van-popup>
    <van-popup v-model="show_10" position="bottom">
      <van-picker
        :columns="timearr"
        show-toolbar
        title="是否有公积金"
        @confirm="gongjconfirm"
        @cancel="gongjcancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { CellGroup, Field, Icon, Popup, Picker, Area, Toast } from 'vant'
import area from '../../assets/js/area.js'
import footer from '@/components/footer/index'
import registerApi from '@/api/register'
import { mapGetters } from 'vuex'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Area.name]: Area,
    [Toast.name]: Toast,
    'v-footer': footer
  },
  data () {
    return {
      formdata: {
        id: null,
        city: [{}, {code: '', name: ''}],
        company: '',
        pay: '',
        way: '',
        status: '',
        card: '',
        car: '',
        home: '',
        shebao: '',
        gongjijin: ''
      },
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
      companyarr: ['事业单位', '普通企业', '其他'],
      payarr: ['0~5000元', '5000~20000元', '20000元以上'],
      wayarr: ['银行代发', '公司转账', '现金发放', '自由收入'],
      statusarr: ['已婚', '未婚'],
      selectarr: ['是', '否'],
      timearr: ['六个月以上', '六个月以下']
    }
  },
  computed: {
    ...mapGetters({
      registerid: 'getregisterID'
    })
  },
  methods: {
    showcity () {
      this.show_1 = true
    },
    cityconfirm (value, index) {
      if (value[1].code === '-1') {
        return false
      }
      this.formdata.city = value
      this.show_1 = false
    },
    citycancel (value, index) {
      this.show_1 = false
    },
    showcompany () {
      this.show_2 = true
    },
    companyconfirm (value, index) {
      this.formdata.company = value
      this.show_2 = false
    },
    companycancel (value, index) {
      this.show_2 = false
    },
    showpay () {
      this.show_3 = true
    },
    payconfirm (value, index) {
      this.formdata.pay = value
      this.show_3 = false
    },
    paycancel (value, index) {
      this.show_3 = false
    },
    showway () {
      this.show_4 = true
    },
    wayconfirm (value, index) {
      this.formdata.way = value
      this.show_4 = false
    },
    waycancel (value, index) {
      this.show_4 = false
    },
    showstatus () {
      this.show_5 = true
    },
    statusconfirm (value, index) {
      this.formdata.status = value
      this.show_5 = false
    },
    statuscancel (value, index) {
      this.show_5 = false
    },
    showcard () {
      this.show_6 = true
    },
    cardconfirm (value, index) {
      this.formdata.card = value
      this.show_6 = false
    },
    cardcancel (value, index) {
      this.show_6 = false
    },
    showcar () {
      this.show_7 = true
    },
    carconfirm (value, index) {
      this.formdata.car = value
      this.show_7 = false
    },
    carcancel (value, index) {
      this.show_7 = false
    },
    showhome () {
      this.show_8 = true
    },
    homeconfirm (value, index) {
      this.formdata.home = value
      this.show_8 = false
    },
    homecancel (value, index) {
      this.show_8 = false
    },
    showshebao () {
      this.show_9 = true
    },
    shebaoconfirm (value, index) {
      this.formdata.shebao = value
      this.show_9 = false
    },
    shebaocancel (value, index) {
      this.show_9 = false
    },
    showgongj () {
      this.show_10 = true
    },
    gongjconfirm (value, index) {
      this.formdata.gongjijin = value
      this.show_10 = false
    },
    gongjcancel (value, index) {
      this.show_10 = false
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
    submitform () {
      if (this.formdata.city[1].name.length === 0) {
        this.myalert('请选择所在地')
        return false
      }
      if (this.formdata.company.length === 0) {
        this.myalert('请选择公司性质')
        return false
      }
      if (this.formdata.pay.length === 0) {
        this.myalert('请选择月收入范围')
        return false
      }
      if (this.formdata.way.length === 0) {
        this.myalert('请选择工资发放形式')
        return false
      }
      if (this.formdata.status.length === 0) {
        this.myalert('请选择婚姻状况')
        return false
      }
      if (this.formdata.card.length === 0) {
        this.myalert('请选择是否有信用卡')
        return false
      }
      if (this.formdata.car.length === 0) {
        this.myalert('请选择是否有车')
        return false
      }
      if (this.formdata.home.length === 0) {
        this.myalert('请选择是否有房')
        return false
      }
      if (this.formdata.shebao.length === 0) {
        this.myalert('请选择是否有社保')
        return false
      }
      if (this.formdata.gongjijin.length === 0) {
        this.myalert('请选择是否有公积金')
        return false
      } else {
        this.formdata.id = this.registerid // 将注册返回的ID传入
        this.loading('加载中...')
        registerApi.step2(this.formdata).then((result) => {
          if (result.data.status === 200) {
            this.$toast.clear()
            this.$router.replace('/registerthree')
          }
        })
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="stylus" scoped>
  .loan_register_2
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
      .next_btn
        display block
        width 80%
        margin 35px auto 0
        padding 10px 0
        background #f4b43f
        color #ffffff
        text-align center
        outline none
        font-size 18px
        border none
        border-radius 8px
  .loan_footer
    background #fffefe
    margin-top 10px
</style>
