<template>
  <div>
    <router-view></router-view>
    <v-tab></v-tab>
  </div>
</template>

<script>
import tabbar from '@/components/tabbar/index'
export default {
  components: {
    'v-tab': tabbar
  }
}
</script>

<style lang="stylus" scoped>

</style>
