import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import index from '../pages/index.vue'
import Articledl from '../pages/Articledl.vue'
import Layout from '../pages/layout.vue'

Vue.use(Router)


export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      props: { default: true, sidebar: false }
    },
    {
      path: '/article',
      name: 'Layout',
      component: Layout,
      props: { default: true, sidebar: false }

    },
    {
      path: '/article/:id',
      name: 'article',
      component: Articledl,
      props: { default: true, sidebar: false }
    },
    {
      path: '/about',
      name: 'about',
			component: About
		},
  ]
})
