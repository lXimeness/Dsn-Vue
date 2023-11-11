<template>
  <div class="dashboard">
    <div class="card-container">
      <form @submit.prevent="addProduct">
        <h2>Bem-Vindo</h2>
        <darkmodeVuearkMode class="button_dark" />
      </form>
      <span class="dark-mode-text">Dark Mode</span>
    </div>
    <router-link to="/dashboard/produtos">
      <button class="button">Ir para Produtos</button>
    </router-link>

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

.tab-bar {
  display: flex;
  justify-content: space-between;
  width: 50%;
  margin: 0 auto;
  padding: 10px;
}

.tab {
  flex: 1;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  color: #000000;
  transition: background-color 0.3s;
}



.button {
  background-color: #000000;
  color: #00FFFF;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 10px;
}
.button:hover {
  background-color: #b98383;
}
.logout-button {
  background-color: #007BFF; 
  color: #ffffff; 
  padding: 10px 20px; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px;
}

.logout-button {
  position: fixed;
  bottom: 10px;
  right: 10px;

}

</style>