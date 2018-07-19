import Vue from 'vue'
import Router from 'vue-router'
import Phtable from '@/components/Phtable/Phtable'
import PhtableInfo from '@/components/PhtableInfo/PhtableInfo'
import PhtableForm from '@/components/PhtableForm/PhtableForm'
import PhtableInfoForm from '@/components/PhtableInfoForm/PhtableInfoForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Phtable',
      component: Phtable
    },
    {
      path: '/phtableinfo',
      name: 'PhtableInfo',
      component: PhtableInfo
    },
    {
      path: '/phtableform',
      name: 'PhtableForm',
      component: PhtableForm
    },
    {
      path: '/phtableinfoform',
      name: 'PhtableInfoForm',
      component: PhtableInfoForm
    }
  ]
})
