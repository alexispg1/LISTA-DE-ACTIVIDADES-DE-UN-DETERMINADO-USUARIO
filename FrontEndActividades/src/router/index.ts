import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import register from '../views/register.vue';
import panel from '../views/panel.vue';
import listaActividades from '../views/listaActividades.vue';
import detalles from '../views/detalles.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {path:'/register',name:'register',component:register},
  {path:'/panel',name:'panel',component:panel},
  {path:'/listaActividades',name:'listaActividades',component:listaActividades},
  {path:'/detalles',name:'detalles',component:detalles},

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
