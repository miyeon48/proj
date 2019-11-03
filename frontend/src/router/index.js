import Vue from 'vue'
import Router from 'vue-router'
import Basket from '@/components/BasketPage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'basket',
      component: Basket
    }
  ]
})