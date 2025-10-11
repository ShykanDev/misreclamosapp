import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/LoginTabsPage.vue'
import LoginTabsPage from '../views/LoginTabsPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: LoginTabsPage, //Parent of the tabs (Who envolve the children tabs ONE)
    children: [ //Array that contains the children tabs 
      { // Default Redirection if route is ''
        path: '',
        redirect: '/tabs/tab1'
      },
      { //Tab that contains 2 properties path and component (Every ONE page should contain at least these 2 properties)
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
