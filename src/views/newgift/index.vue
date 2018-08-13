<template>
  <div>
    <img :src="baseimgurl + imgurl">
    <a :href="url">
      <button type="button" class="btn">立即领取</button>
    </a>
  </div>
</template>
<script>
import giftApi from '@/api/gift/index'
export default {
  data () {
    return {
      baseimgurl: process.env.BASE_API,
      imgurl: '',
      url: ''
    }
  },
  methods: {
    getlist () {
      giftApi.getlist().then((res) => {
        if (res.data.status === 200) {
          this.imgurl = res.data.giftlist[0].imgurl
          this.url = res.data.giftlist[0].url
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getlist()
  }
}
</script>

<style lang="stylus" scoped>
  img
    display inline-block
    max-width 100%
    width 100%
    height auto
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
</style>
