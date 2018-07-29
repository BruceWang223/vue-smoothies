import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import AddSmoothie from '@/components/AddSmoothie'
import EditSmoothie from '@/components/EditSmoothie'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Index
    } , 
    {
      name: 'AddSmoothie',
      path: '/add-smoothie',
      component: AddSmoothie
    } ,
    {
      name: 'EditSmoothie',
      path: '/edit-smoothie/:smoothie_id',
      component: EditSmoothie
    }
  ]
});

