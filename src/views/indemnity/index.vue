<template>
  <div class="about_box" v-html="content">
    <!-- <p>
      金融之家通过其多渠道发布，提供财经、商业、金融等领域有价值、有深度的新闻报道和分析文章，帮助企业和组织与媒体、投资者及普通大众进行充分、及时的动态互动，从而为塑造品牌、提升知名度、推进社会影响、筹集资本提供支持。

金融之家隶属于北京融之家网络科技有限公司，成立于2013年06月06日，并于2014年01月18日正式上线进入试运行阶段。是一家互联网金融新媒体平台。自成立以来公司致力于在互联网金融做出一些创新与改变，以互联网为主要传播渠道，为投资者提供金融资讯，并每日实时发布，是国内较为成功的互联网金融垂直领域资讯平台。全方位为大众读者提供商业分析与财经资讯，向投资者提供金融数据与分析，帮助用户熟悉了解相关金融业务与投资。

金融之家在国内外，媒体渠道包括：1,300多家平面媒体（包括报纸、杂志、商业和行业期刊类出版物；700多家综合及门户、行业垂直网站；50 多家财经金融领域专业媒体及金融信息终端；140多家电视和广播电台、通讯社等各类新闻机构；近20家移动新闻客户端和微博、微信等移动社交网络，移动订阅用户和微博粉丝总数超过1,200,000人，其中微信粉丝接近1,000,000名，大多数为记者、编辑、及业内资深人士。

金融之家特别关注那些具有重大交易价值的、成长性与市场性兼具的商业标的，也重视新兴行业的变迁、组合投资的机会与风险，以及在金融市场的脉动与演进下，对经济动态解析及深度报道。

我们的出发点是，为用户甄别那些具有价值的金融信息，并在此基础上，提供独特的金融财经解析，并用心做好优质金融机构和投资者之间的互动服务
    </p> -->
  </div>
</template>

<script>
import reliefApi from '@/api/company'
export default {
  data () {
    return {
      content: ''
    }
  },
  methods: {
    getcontent () {
      reliefApi.getrelief().then((result) => {
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
