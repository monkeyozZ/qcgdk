<template>
  <div class="about_box" v-html="content">
  </div>
</template>

<script>
import aboutApi from '@/api/company'
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getcontent () {
      aboutApi.getabout().then((result) => {
        if (result.data.status === 200) {
          this.content = result.data.content
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getcontent()
  }
}
</script>

<style lang="stylus" scoped>
.about_box
  padding 20px 10px
  box-sizing border-box
  height 100vh
  background #fff
  p
    font-size 14px
    color #333333
    line-height 24px
</style>
