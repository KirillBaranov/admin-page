// pages.
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Ontime from '../views/Ontime.vue'
import Ushu from '../views/Ushu.vue'
import Logs from '../views/Logs.vue'
import Settings from '../views/Settings.vue'

import PageNotFound from '../views/PageNotFound.vue'


const basic = ' | Панель администратора Kaboom2'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Главная' + basic },
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'My Page Title' + basic }
  },
  {
    path: '/ontime',
    name: 'Ontime',
    component: Ontime,
    meta: { title: 'My Page Title' + basic }
  },
  {
    path: '/ushu',
    name: 'Ushu',
    component: Ushu,
    meta: { title: 'My Page Title' + basic }
  },
  {
    path: '/logs',
    name: 'Logs',
    component: Logs,
    meta: { title: 'My Page Title' + basic }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    props: true,
    meta: { title: 'My Page Title' + basic }
  },
  {
    path: "*",
    component: PageNotFound
  }
]
