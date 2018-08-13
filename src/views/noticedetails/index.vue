<template>
  <div class="content" v-html="content">
    <van-loading color="white" class="loading" v-show="showloading"/>
  </div>
</template>

<script>
import { Loading } from 'vant'
import noticeApi from '@/api/notice'
export default {
  components: {
    [Loading.name]: Loading
  },
  data () {
    return {
      content: '',
      showloading: false
    }
  },
  methods: {
    getnoticecontent () {
      let id = this.$route.params.id
      this.showloading = true
      noticeApi.getdetails(id).then((response) => {
        this.showloading = false
        this.content = response.data.noticedetails
      })
    }
  },
  mounted () {
    this.getnoticecontent()
  }
}
</script>

<style lang="stylus" scoped>
.content
  height 100vh
  background #fff
  padding 20px 10px
  .loading
    position absolute
    top 40%
    left 50%
    transform translate(-50%,-50%)
    padding 10px
    background rgba(0,0,0,.5)
    border-radius 3px
  p
    line-height 22px
    color #333
    text-indent 2em
</style>
