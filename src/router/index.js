import Vue from 'vue'
import Router from 'vue-router'
import Phtable from '@/components/Phtable/Phtable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Phtable',
      component: Phtable
    }
  ]
})
