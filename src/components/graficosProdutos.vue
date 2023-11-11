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
              label: 'Produtos com Quantidade Negativa ou Zerada',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: '#DC143C',
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
            const produtosNegativosOuZerados = response.data.filter((produto) => produto.quantidadeEstoque <= 0);
            console.log(produtosNegativosOuZerados)
  
            // Atualiza os dados do gráfico com os produtos negativos ou zerados
            this.chartData.labels = produtosNegativosOuZerados.map((produto) => produto.nome);
            this.chartData.datasets[0].data = produtosNegativosOuZerados.map((produto) => produto.quantidadeEstoque);
  
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
  