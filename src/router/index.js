import Vue from 'vue'
import Router from 'vue-router'
import useEle from '@/components/common/useEle.vue'
import Login from '@/components/login/login.vue'
import Home from '@/components/pages/home.vue'
import User from '@/components/pages/user/user.vue'
import Rights from '@/components/pages/rights/rights.vue'
import Roles from '@/components/pages/roles/roles.vue'
import Goods from '@/components/pages/goods/goods.vue'
import GoodsAdd from '@/components/pages/goods/add.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'ele',
      path: '/ele',
      component: useEle
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/home',
      component: Home,
      children: [
        {
          path: '/user', 
          component: User
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/goods',
          component: Goods
        },
        {
          path: '/goods/add',
          component: GoodsAdd
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    var token = window.localStorage.getItem('token')
    if (!token) {
      Message.error('您还没有登录，请先登录')
      router.push('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router