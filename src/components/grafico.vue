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
              borderColor: '#00FFFF',
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
      const produtosPositivos = response.data.filter((produto) => produto.quantidadeEstoque > 0);
      const produtosOrdenadosPorEstoque = produtosPositivos.sort((a, b) => b.quantidadeEstoque - a.quantidadeEstoque);

 
      this.chartData.labels = produtosOrdenadosPorEstoque.map((produto) => produto.nome);
      this.chartData.datasets[0].data = produtosOrdenadosPorEstoque.map((produto) => produto.quantidadeEstoque);


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
  