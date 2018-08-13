<template>
  <div>
    <div class="form_box">
      <van-cell-group>
        <van-field
        v-model="formdata.bankname"
          label="银行名称"
          @click.native="showterracePicker"
          disabled
        >
          <van-icon slot="icon" name="arrow" />
        </van-field>
        <van-field
          v-model="formdata.cardcode"
          label="卡号"
          type="tel"
          icon="clear"
          maxlength="19"
          placeholder="请输入卡号"
          @click-icon="formdata.cardcode = ''"
        >
        </van-field>
        <van-field
          v-model="formdata.cardname"
          label="信用卡名称"
          icon="clear"
          placeholder="请输入信用卡名称（铂金卡）"
          @click-icon="formdata.cardname = ''"
        >
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
         v-model="formdata.Count"
          label="额度"
          type="tel"
          placeholder="请输入信用卡金额（数字）"
          icon="clear"
          @click-icon="formdata.Count = ''"
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
        :columns="bankcate"
        show-toolbar
        title="选择银行"
        @confirm="terraceonConfirm"
        @cancel="terraceonCancel"
      />
    </van-popup>
    <van-popup v-model="show_1" position="bottom">
      <van-picker
        :columns="day"
        show-toolbar
        title="选择还款日"
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
import cardApi from '@/api/card'
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
      bankcate: [],
      formdata: {
        bankname: '',
        cardcode: '',
        cardname: '',
        repaymentDate: '',
        Count: '',
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
      cardApi.getformdata(id).then((res) => {
        if (res.data.status === 200) {
          this.formdata.bankname = res.data.datalist.bankname
          this.formdata.cardcode = res.data.datalist.cardcode
          this.formdata.cardname = res.data.datalist.cardname
          this.formdata.repaymentDate = res.data.datalist.repaymentDate
          this.formdata.Count = res.data.datalist.Count
          this.formdata.remindDate = res.data.datalist.remindDate
        }
      })
    },
    getbank () {
      cardApi.getbank().then((res) => {
        if (res.data.status === 200) {
          res.data.banklist.map((item) => {
            this.bankcate.push(item.title)
          })
        }
      })
    },
    creatbank (obj) {
      cardApi.creatbank(obj).then((res) => {
        if (res.data.status === 200) {
          this.$toast.clear()
          this.myalert(res.data.message)
          this.$router.push({path: '/card/list', query: {cate: 'item2'}})
        } else {
          this.$toast.clear()
          this.myalert(res.data.message)
        }
      })
    },
    updatebank (id, obj) {
      cardApi.updatebank(id, obj).then((res) => {
        if (res.data.status === 200) {
          this.$toast.clear()
          this.myalert(res.data.message)
          this.$router.push({path: '/card/list', query: {cate: 'item2'}})
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
      this.formdata.bankname = value
      this.show_2 = false
    },
    terraceonCancel (value, index) {
      this.formdata.bankname = ''
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
      if (this.formdata.bankname.length === 0) {
        this.myalert('请选择银行')
        return false
      }
      if (this.formdata.cardname.length === 0) {
        this.myalert('请输入信用卡名称')
        return false
      }
      if (this.formdata.repaymentDate.length === 0) {
        this.myalert('请选择还款日')
        return false
      }
      if (this.formdata.Count.length === 0) {
        this.myalert('请输入信用卡额度')
        return false
      } else {
        let reg = /^\+?[1-9][0-9]*$/
        let res = reg.test(this.formdata.Count)
        if (!res) {
          this.myalert('请输入正确的信用卡额度')
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
          this.updatebank(this.$route.query.id, this.formdata)
        } else {
          this.$set(this.formdata, 'openid', this.user_info.openid)
          this.loading('加载中...')
          this.creatbank(this.formdata)
        }
      }
    }
  },
  mounted () {
    this.getbank()
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
