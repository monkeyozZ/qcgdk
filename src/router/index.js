import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import Auth from '../utils/auth'
import store from '../store'
import authApi from '@/api/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/dk',
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: layout,
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/index/index'),
          meta: { title: '币抖-推荐页' }
        }
      ]
    },
    {
      path: '/loan',
      redirect: '/loan/list',
      component: layout,
      children: [
        {
          path: 'list',
          name: 'loanlist',
          component: () => import('@/views/loan/index'),
          meta: { title: '币抖-贷款' }
        }
      ]
    },
    {
      path: '/creatbill',
      name: 'creatbill',
      component: () => import('@/views/creatbill/index'),
      meta: { title: '币抖-创建帐单' }
    },
    {
      path: '/card',
      redirect: '/card/list',
      component: layout,
      children: [
        {
          path: 'list',
          name: 'cardlist',
          component: () => import('@/views/card/index'),
          meta: { title: '币抖-信用卡' }
        }
      ]
    },
    {
      path: '/addcard',
      name: 'addcard',
      component: () => import('@/views/addcard/index'),
      meta: { title: '币抖-新增信用卡' }
    },
    {
      path: '/own',
      redirect: '/own/list',
      component: layout,
      children: [
        {
          path: 'list',
          name: 'ownlist',
          component: () => import('@/views/own/index'),
          meta: { title: '币抖-我的' }
        }
      ]
    },
    {
      path: '/personal',
      component: () => import('@/views/personal/index'),
      meta: { title: '币抖-个人资料' }
    },
    {
      path: '/own',
      redirect: '/own/viewHistory',
      component: layout,
      children: [
        {
          path: 'viewHistory',
          name: 'ownviewHistory',
          component: () => import('@/views/viewHistory/index'),
          meta: { title: '币抖-我的足迹' }
        }
      ]
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('@/views/calculator/index'),
      meta: { title: '币抖-还款计算' }
    },
    {
      path: '/newgift',
      name: 'newgift',
      component: () => import('@/views/newgift/index'),
      meta: { title: '币抖-新人礼包' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: { title: '币抖-关于我们' }
    },
    {
      path: '/indemnity',
      name: 'indemnity',
      component: () => import('@/views/indemnity/index'),
      meta: { title: '币抖-免责声明' }
    },
    {
      path: '/mylimti',
      name: 'mylimti',
      component: () => import('@/views/mylimti/index'),
      meta: { title: '币抖-我的信用额度' }
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('@/views/notice/index'),
      meta: { title: '币抖-我的通知' }
    },
    {
      path: '/noticedetails/:id',
      name: 'noticedetails',
      component: () => import('@/views/noticedetails/index'),
      meta: { title: '币抖-我的通知' }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index'),
      meta: { title: '贷款申请' }
    },
    {
      path: '/registertwo',
      name: 'registertwo',
      component: () => import('@/views/registerstep2/index'),
      meta: { title: '贷款申请' }
    },
    {
      path: '/registerthree',
      name: 'registerthree',
      component: () => import('@/views/registerstep3/index'),
      meta: { title: '贷款申请' }
    },
    {
      path: '/clause',
      name: 'clause',
      component: () => import('@/views/register/xieyi/index'),
      meta: { title: '服务条款' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  new Vue().$loading()
  if (to.path !== '/register' && to.path !== '/registertwo' && to.path !== '/registerthree' && to.path !== '/clause') {
    let status = Auth.isLogin() ? Auth.isLogin() : 'false'

    if (to.query.code && JSON.parse(status) === false) {
      Auth.setLoginStatus(true)
      store.dispatch('setcode', to.query.code)
      next()
    }

    if (JSON.parse(status)) {
      store.dispatch('setLoginstatus', true)
      authApi.getuserinfo().then((res) => {
        if (res.data.status === 200) {
          store.dispatch('inituserinfo', JSON.parse(res.data.userinfo))
        } else {
          Auth.setLoginStatus(false)
        }
      }).catch((err) => {
        console.log(err)
      })
      next()
    }

    status = Auth.isLogin() ? Auth.isLogin() : 'false'

    if (JSON.parse(status) === false) {
      let fullurl = to.fullPath
      let gourl = encodeURI('http://bidou.wumakeji.com/dk' + fullurl)
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx83b956b6493bef90&redirect_uri=' + gourl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      return false
    }
    next()
  }
  if (to.meta.title) {
    document.title = to.meta.title
    next()
  }

  if (to.path === '/creatbill' || to.path === '/addcard' || to.path === '/register' || to.path === '/registertwo' || to.path === '/registerthree' || to.path === '/clause' || to.path === '/about' || to.path === '/indemnity') {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#fff'
    document.getElementsByTagName('body')[0].style.paddingBottom = '0px'
  } else {
    document.getElementsByTagName('body')[0].style.backgroundColor = '#f6f6f6'
    document.getElementsByTagName('body')[0].style.paddingBottom = '50px'
  }
  next()
})

router.afterEach(() => {
  new Vue().$loading.end()
})
export default router
