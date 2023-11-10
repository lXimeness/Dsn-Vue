<template>
  <div class="dashboard">
    <div class="card-container">
      <!-- Formulário para adicionar um produto -->
      <form @submit.prevent="addProduct">
        <h2>Bem-Vindo</h2>
        <darkmodeVuearkMode class="button_dark" />
        <!-- Se precisar adicionar algum conteúdo ao formulário, pode adicionar dentro da div .form-group -->
      </form>
      <span class="dark-mode-text">Dark Mode</span>
    </div>

    <!-- Lista de Produtos -->
    <!-- Botão para ir para a página de produtos -->
    <router-link to="/dashboard/produtos">
      <button class="button">Ir para Produtos</button>
    </router-link>

    <!-- Botão para ir para a página de clientes -->
    <router-link to="/dashboard/clientes">
      <button class="button">Ir para Clientes</button>
    </router-link>

    <div class="container mt-4">
      <div class="row">
        <div class="col-md-6">
          <card title="Total de Produtos" :value="totalProdutos" />
        </div>
        <div class="col-md-6">
          <card title="Total de Clientes" :value="totalClientes" />
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <grafico></grafico>
          <graficosProdutos></graficosProdutos>
        </div>
      </div>
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import darkmodeVuearkMode from '@/components/darkmode.vue'
import axios from 'axios';
import card from './card.vue';
import grafico from '@/components/grafico.vue';
import graficosProdutos from '@/components/graficosProdutos.vue';
export default {
  components: {
    darkmodeVuearkMode, card ,grafico ,graficosProdutos, 
  },
  name: 'Dashboard',
  data() {
    return {
      totalProdutos: 0,
      totalClientes: 0,
      productId: '',
      products: [],
    };
  },
  created() {
    this.getTotalProdutos();
    this.getTotalClientes();
  },
  methods: {
    async getTotalProdutos() {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('http://localhost:3400/produtos', {
      headers: {
        'Authorization': token
      }
    });
    if (response.status === 200) {
      console.log('Produtos puxados com sucesso!');
      this.totalProdutos = response.data.length;
    } else {
      console.error('Erro ao buscar o total de produtos:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar o total de produtos:', error);
  }
},
async logout() {

      window.localStorage.removeItem('token');
      

      
      await this.$router.push('/login');
    },

async getTotalClientes() {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('http://localhost:3400/clientes', {
      headers: {
        'Authorization': token
      }
    });
    if (response.status === 200) {
      console.log('Clientes puxados com sucesso!');
      this.totalClientes = response.data.length;
    } else {
      console.error('Erro ao buscar o total de clientes:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar o total de clientes:', error);
  }
},
  },
};
</script>

<style scoped>

@import './Css/Dashboardcss.css';
</style>