<template>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-responsive>
          <v-container fluid>
            <canvas ref="myChart"></canvas>
          </v-container>
        </v-responsive>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import { Chart } from 'chart.js/auto';
  import axios from 'axios';
  import { VCard, VCardTitle, VCardText, VContainer, VResponsive } from 'vuetify';
  export default {
    components: {
    VCard,
    VCardTitle,
    VCardText,
    VContainer,
    VResponsive,
  },
    data() {
      return {
        chartData: {
          labels: [],
          datasets: [
            {
              label: 'Estoque',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              data: [],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
    mounted() {
      this.fetchProductData();
    },
    methods: {

        async fetchProductData() {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.get('http://localhost:3400/produtos', {
      headers: {
        'Authorization': token
      }
    });
    
    if (response.status === 200) {
      const produtosOrdenadosPorEstoque = response.data.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);

      // Atualiza os dados do gráfico com os produtos ordenados por estoque
      this.chartData.labels = produtosOrdenadosPorEstoque.map((produto) => produto.nome);
      this.chartData.datasets[0].data = produtosOrdenadosPorEstoque.map((produto) => produto.quantidadeEstoque);

      // Renderiza o gráfico com os novos dados
      this.renderChart();
    } else {
      console.error('Erro ao buscar os produtos:', response.data);
    }
  } catch (error) {
    console.error('Erro ao buscar os produtos:', error);
  }
},
      renderChart() {
        const ctx = this.$refs.myChart.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: this.chartData,
          options: this.options,
        });
      },
    },
  };
  </script>
  