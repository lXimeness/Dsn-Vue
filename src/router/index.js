import { createRouter, createWebHashHistory } from 'vue-router';
import login from '../components/login.vue';
import MainPage from '../views/Mainpage.vue';
import dashboard from '../components/dashboard.vue';
import produtoCrud from '../components/produtoCrud.vue'; 
import clienteCrud from '../components/clienteCrud.vue'; 
import card from '../components/card.vue'
const routes = [
  {
    path: '/Main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/produtoCrud',
    name: 'produtoCrud',
    component: produtoCrud, 
  },
  {
    path: '/clienteCrud',
    name: 'clienteCrud',
    component: clienteCrud, 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboard,
  },
  {
  path: '/card',
  name:'card',
  component: card,
  },
  {
    path: '/produtos',
    name: 'produtos', 
    component: produtoCrud,
  }
,  
  {
    path: '/dashboard/clientes',
    name: 'clientes', 
    component: clienteCrud, 
  },
  {
    path: '/dashboard/produtos',
    name: 'produtos', 
    component: produtoCrud, 
  },
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/',
    redirect: '/login', 
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
