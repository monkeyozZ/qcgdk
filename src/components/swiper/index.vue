<template>
  <div>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in bannerlist" :key="index">
          <a :href="item.url">
            <img :src="baseimgurl + item.imgurl">
          </a>
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: ['bannerlist'],
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      baseimgurl: process.env.BASE_API,
      swiperOption: {
        height: 115,
        // autoplay: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        // loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.swiper-container
  height: 115px;
  .swiper-slide
    img
      display: inline-block;
      width:100%;
      height: 100%;
</style>
