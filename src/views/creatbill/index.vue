<template>
  <div>
    <div class="form_box">
      <van-cell-group>
        <van-field
        v-model="formdata.loanterrace"
          label="平台名称"
          @click.native="showterracePicker"
          disabled
        >
          <van-icon slot="icon" name="arrow" />
        </van-field>
        <van-field
        v-model="formdata.repaymentDate"
          label="还款日"
          disabled
          @click.native="showDatetimePicker1"
        >
          <van-icon slot="icon" name="arrow" />
        </van-field>
        <van-field
          v-model="formdata.repaymentNum"
          label="每期还款"
          type="tel"
          icon="clear"
          placeholder="请输入每期应还金额（元）"
          @click-icon="formdata.repaymentNum = ''"
        >
        </van-field>
        <van-field
         v-model="formdata.hasrepaymentCount"
          label="已还期数"
          type="tel"
          placeholder="请输入已还期数"
          icon="clear"
           @click-icon="formdata.hasrepaymentCount = ''"
        >
        </van-field>
        <van-field
         v-model="formdata.repaymentCount"
          label="总期数"
          type="tel"
          placeholder="请输入总期数"
          icon="clear"
          @click-icon="formdata.repaymentCount = ''"
        >
        </van-field>
        <van-field
        v-model="formdata.remindDate"
          label="设置提醒"
          @click.native="showDatetimePicker2"
          disabled
        >
          <van-icon slot="icon" name="arrow" />
        </van-field>
      </van-cell-group>
      <button type="button" class="btn" @click="submitform">完成</button>
    </div>
    <van-popup v-model="show_2" position="bottom">
      <van-picker
        :columns="terrace"
        show-toolbar
        title="选择平台"
        @confirm="terraceonConfirm"
        @cancel="terraceonCancel"
      />
    </van-popup>
    <van-popup v-model="show_1" position="bottom">
      <van-picker
        :columns="day"
        show-toolbar
        title="选择还款日"
        :visible-item-count="5"
        @confirm="dayonConfirm"
        @cancel="dayonCancel"
      />
    </van-popup>
    <van-popup v-model="show_3" position="bottom">
      <van-picker
        :columns="day"
        show-toolbar
        title="提醒日期"
        @confirm="remindonConfirm"
        @cancel="remindonCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import loanApi from '@/api/loan'
import { CellGroup, Field, Icon, Popup, Picker, Toast } from 'vant'
import { mapGetters } from 'vuex'
export default {
  components: {
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Icon.name]: Icon,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    [Toast.name]: Toast
  },
  data () {
    return {
      show_1: false,
      show_2: false,
      show_3: false,
      day: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日',
        '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日',
        '27日', '28日', '29日', '30日', '31日'],
      terrace: [/* '360借条 ', ' 新浪借条 ', '好贷 ', '平安普惠', '阳光普惠', '宜信普惠' */],
      formdata: {
        loanterrace: '',
        repaymentDate: '',
        repaymentNum: '',
        hasrepaymentCount: '',
        repaymentCount: '',
        remindDate: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      user_info: 'user_info'
    })
  },
  methods: {
    initformdata () {
      let id = this.$route.query.id
      if (id) {
        this.getformdata(id)
      }
    },
    getformdata (id) {
      loanApi.getformdata(id).then((res) => {
        if (res.data.status === 200) {
          this.formdata.loanterrace = res.data.datalist.loanterrace
          this.formdata.repaymentDate = res.data.datalist.repaymentDate
          this.formdata.repaymentNum = res.data.datalist.repaymentNum
          this.formdata.hasrepaymentCount = res.data.datalist.hasrepaymentCount
          this.formdata.repaymentCount = res.data.datalist.repaymentCount
          this.formdata.remindDate = res.data.datalist.remindDate
        }
      })
    },
    getplatform (openid) {
      loanApi.getplatform(openid).then((res) => {
        if (res.data.status === 200) {
          res.data.platformlist.map((item) => {
            this.terrace.push(item.title)
          })
        }
      })
    },
    creatbill (obj) {
      loanApi.creatbill(obj).then((res) => {
        if (res.data.status === 200) {
          this.$toast.clear()
          this.myalert(res.data.message)
          this.$router.push({path: '/loan/list', query: {cate: 'item2'}})
        } else {
          this.$toast.clear()
          this.myalert(res.data.message)
        }
      })
    },
    updatebill (id, obj) {
      loanApi.updatebill(id, obj).then((res) => {
        if (res.data.status === 200) {
          this.$toast.clear()
          this.myalert(res.data.message)
          this.$router.push({path: '/loan/list', query: {cate: 'item2'}})
        } else {
          this.$toast.clear()
          this.myalert(res.data.message)
        }
      })
    },
    showterracePicker () {
      this.show_2 = true
    },
    terraceonConfirm (value, index) {
      this.formdata.loanterrace = value
      this.show_2 = false
    },
    terraceonCancel (value, index) {
      this.formdata.loanterrace = ''
      this.show_2 = false
    },
    showDatetimePicker1 () {
      this.show_1 = true
    },
    dayonConfirm (value, index) {
      this.formdata.repaymentDate = value
      this.show_1 = false
    },
    dayonCancel (value, index) {
      this.formdata.repaymentDate = ''
      this.show_1 = false
    },
    showDatetimePicker2 () {
      this.show_3 = true
    },
    remindonConfirm (value, index) {
      this.formdata.remindDate = value
      this.show_3 = false
    },
    remindonCancel (value, index) {
      this.formdata.remindDate = ''
      this.show_3 = false
    },
    myalert (msg) {
      this.$toast({position: 'top', message: msg})
    },
    loading (textmsg) {
      this.$toast.loading({
        mask: true,
        duration: 5000,
        message: textmsg
      })
    },
    submitform () {
      if (this.formdata.loanterrace.length === 0) {
        this.myalert('请选择平台')
        return false
      }
      if (this.formdata.repaymentDate.length === 0) {
        this.myalert('请选择还款日')
        return false
      }
      if (this.formdata.repaymentNum.length === 0) {
        this.myalert('请输入每期还款金额')
        return false
      } else {
        let reg = /^0\.([1-9]|\d[1-9])$|^[1-9]\d{0,8}\.\d{0,2}$|^[1-9]\d{0,8}$/
        let res = reg.test(this.formdata.repaymentNum)
        if (!res) {
          this.myalert('请输入正确的还款金额')
          return false
        }
      }
      if (this.formdata.hasrepaymentCount.length === 0) {
        this.myalert('请输入已还款期数')
        return false
      } else {
        let reg = /^\+?[1-9][0-9]*$/
        let res = reg.test(this.formdata.hasrepaymentCount)
        if (!res) {
          this.myalert('请输入正确的还款期数')
          return false
        }
      }
      if (this.formdata.repaymentCount.length === 0) {
        this.myalert('请输入总期数')
        return false
      } else {
        let reg = /^\+?[1-9][0-9]*$/
        let res = reg.test(this.formdata.repaymentCount)
        if (!res) {
          this.myalert('请输入正确的总期数')
          return false
        }
      }
      if (this.formdata.remindDate.length === 0) {
        this.myalert('请选择提醒日期')
        return false
      } else {
        if (this.$route.query.id) {
          this.$set(this.formdata, 'openid', this.user_info.openid)
          this.loading('加载中...')
          this.updatebill(this.$route.query.id, this.formdata)
        } else {
          this.$set(this.formdata, 'openid', this.user_info.openid)
          this.loading('加载中...')
          this.creatbill(this.formdata)
        }
      }
    }
  },
  mounted () {
    this.getplatform()
    this.initformdata()
  }
}
</script>

<style lang="stylus" scoped>
.form_box
  height calc(100vh - 50px)
  background #fff
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
  .van-cell-group
    &:after
      border: 0 solid #fff
</style>
