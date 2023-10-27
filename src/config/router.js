import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeComponent from '@/components/home/HomeComponent'
import AdminPages from '@/components/admin/AdminPages'
import StatComponent from '@/components/home/StatComponent'
import AuthUser from '@/components/auth/AuthUser'
import SearchPersons from '@/components/SearchPersons'
import PersonAdmin from '@/components/PersonAdmin'
import Addresslist from '@/components/AddressList'

import { userKey } from '@/global'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: HomeComponent, AuthUser,
    meta: { requiresLogin: true }
    
}, 
{
    name: 'adminPages',
    path: '/admin',
    component: AdminPages,
    meta: { requiresLogin: true }
 },
 {
    name: 'PersonAdmin',
    path: '/personAdmin',
    component: PersonAdmin,
    meta: { requiresLogin: true }
 },
 {
    name: 'PersonAdmin-id',
    path: '/personAdmin/:id',
    component: PersonAdmin,
    meta: { requiresLogin: true }
 }, 
 {
    name: 'addresslist',
    path: '/addresslist',
    component: Addresslist
 }, 
 

 {
     name: 'Stat',
     path: '/stat',
     component: StatComponent,
     meta: { requiresLogin: true }
  }, 
  {
      name: 'Search',
      path: '/search',
      component: SearchPersons,
      meta: { requiresLogin: true }
   },
    {
    name: 'authUser',
    path: '/login',
    component: AuthUser
}
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    
    if(to.matched.some(record => record.meta.requiresLogin)) {
        const user = JSON.parse(json)
    
        user && user.id != null ? next() : next({ path: '/login' })
    } else {
        next()
    }

})
export default router