import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import User from '../views/User'
import UserDetail from '../views/UserDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'home'
    },
    {
      path: '/login',
      component: Login,
      name: 'login'
    },
    {
      path: '/user',
      component: User,
      name: 'user'
    },
    {
      path: '/user/detail',
      component: UserDetail,
      name: 'user-detail'
    }
  ]
})
