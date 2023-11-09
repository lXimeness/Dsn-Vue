import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../components/Login.vue';
import MainPage from '../views/Mainpage.vue';
import Dashboard from '../components/Dashboard.vue';
import ProdutoCrud from '../components/ProdutoCrud.vue'; // Importe ProdutoCrud
import ClienteCrud from '../components/ClienteCrud.vue'; // Importe ClienteCrud
import card from '../components/card.vue'
const routes = [
  {
    path: '/Main',
    name: 'MainPage',
    component: MainPage,
  },
  {
    path: '/ProdutoCrud',
    name: 'ProdutoCrud',
    component: ProdutoCrud, 
  },
  {
    path: '/ClienteCrud',
    name: 'ClienteCrud',
    component: ClienteCrud, 
  },
  {
    path: '/Dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
  path: '/card',
  name:'card',
  component: card,
  },
  {
    path: '/produtos',
    name: 'Produtos', // Nome da rota
    component: ProdutoCrud,
  }
,  
  {
    path: '/dashboard/clientes',
    name: 'Clientes', // Nome da rota, se necessário
    component: ClienteCrud, // Use o componente ClienteCrud
  },
  {
    path: '/dashboard/produtos',
    name: 'Produtos', // Nome da rota, se necessário
    component: ProdutoCrud, // Use o componente ProdutoCrud
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    redirect: '/Login', // Redirecionar para a rota de login por padrão
  },
  // ... outras rotas do seu aplicativo
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
