import Vue from 'vue'
import Router from 'vue-router'
import Phtable from '@/components/Phtable/Phtable'
import PhtableInfo from '@/components/PhtableInfo/PhtableInfo'

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
    }
  ]
})
