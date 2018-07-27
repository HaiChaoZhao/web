import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Phtable from '@/components/Phtable/Phtable'
import PhtableInfo from '@/components/PhtableInfo/PhtableInfo'
import PhtableForm from '@/components/PhtableForm/PhtableForm'
import PhtableInfoForm from '@/components/PhtableInfoForm/PhtableInfoForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'Phtable',
          component: Phtable
        },
        {
          path: 'phtableinfo',
          name: 'PhtableInfo',
          component: PhtableInfo
        },
        {
          path: 'phtableform',
          name: 'PhtableForm',
          component: PhtableForm
        },
        {
          path: 'phtableinfoform',
          name: 'PhtableInfoForm',
          component: PhtableInfoForm
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // {
    //   path: '/phtableinfo',
    //   name: 'PhtableInfo',
    //   component: PhtableInfo
    // },
    // {
    //   path: '/phtableform',
    //   name: 'PhtableForm',
    //   component: PhtableForm
    // },
    // {
    //   path: '/phtableinfoform',
    //   name: 'PhtableInfoForm',
    //   component: PhtableInfoForm
    // }
  ]
})
