<template>
  <div class="Produto">
    <form v-if="editingProduct" @submit.prevent="updateProduct">
      <div class="form-group">
        <label for="productNome">Nome:</label>
        <input type="text" id="productNome" v-model="editingProduct.nome" required>
      </div>
      <div class="form-group">
        <label for="productValor">Valor:</label>
        <input type="number" id="productValor" v-model="editingProduct.valor" required>
      </div>
      <div class="form-group">
        <label for="productQuantidade">Quantidade em Estoque:</label>
        <input type="number" id="productQuantidade" v-model="editingProduct.quantidadeEstoque" required>
      </div>
      <div class="form-group">
        <label for="productObservacao">Observação:</label>
        <input type="text" id="productObservacao" v-model="editingProduct.observacao">
      </div>
      <div class="form-group">
        <button class="button" type="submit">Atualizar Produto</button>
        <button class="cancel-button" @click="cancelEdit">Cancelar</button>
      </div>
    </form>

    <div class="container">
      <form @submit.prevent="addProduct" class="form-container">
        <h2>Adicionar Produto</h2>
        <div class="form-group">
          <label for="productNome">Nome:</label>
          <input type="text" id="productNome" v-model="newProduct.nome" required>
        </div>
        <div class="form-group">
          <label for="productValor">Valor:</label>
          <input type="number" id="productValor" v-model="newProduct.valor" required>
        </div>
        <div class="form-group">
          <label for="productQuantidade">Quantidade em Estoque:</label>
          <input type="number" id="productQuantidade" v-model="newProduct.quantidadeEstoque" required>
        </div>
        <div class="form-group">
          <label for="productObservacao">Observação:</label>
          <input type="text" id="productObservacao" v-model="newProduct.observacao">
        </div>
        <div class="form-group">
          <button class="button" type="submit">Adicionar Produto</button>
        </div>
        <button class="go-back-button" @click="goBack">Voltar</button>
      </form>

      <!-- Lista de Produtos -->
      <div class="product-list">
        <h2>Lista de Produtos</h2>
        <ul>
          <li v-for="product in products" :key="product.id">
            Nome: {{ product.nome }} - Valor: R$ {{ product.valor }} - Estoque: {{ product.quantidadeEstoque }}
            - Observação: {{ product.observacao }}
            <div class="button-group">
              <button class="edit-button" @click="startEdit(product)">Editar</button>
              <button class="delete-button" @click="confirmDelete(product)">Excluir</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Produto',
  data() {
    return {
      newProduct: {
        nome: '',
        valor: 0,
        quantidadeEstoque: 0,
        observacao: 'Produto original',
      },
      products: [],
      editingProduct: null,
    };
  },
  created() {
    this.getProducts(); 
  },
  methods: {
    startEdit(product) {
      
      this.editingProduct = { ...product };
    },
    cancelEdit() {
      this.editingProduct = null;
    },
    async getProducts() {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.get('http://localhost:3400/produtos', {
          headers: {
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          this.products = response.data;
        } else {
          console.error('Erro ao buscar a lista de produtos:', response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar a lista de produtos:', error);
      }
    },

    async addProduct() {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.post('http://localhost:3400/produtos', this.newProduct, {
          headers: {
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          console.log('Produto adicionado com sucesso!');
          this.newProduct = {
            nome: '',
            valor: 0,
            quantidadeEstoque: 0,
            observacao: 'Produto original',
          };
          this.getProducts(); // Atualiza a lista de produtos após a adição bem-sucedida
        } else {
          console.error('Erro ao adicionar o produto:', response.data);
        }
      } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
      }
    },

    async updateProduct() {
      if (this.editingProduct) {
        try {
          const token = window.localStorage.getItem('token');
          const response = await axios.put('http://localhost:3400/produtos/' + this.editingProduct.id, this.editingProduct, {
            headers: {
              'Authorization': token,
            },
          });

          if (response.status === 200) {
            console.log('Produto atualizado com sucesso!');
            this.editingProduct = null;
            this.getProducts();
          } else {
            console.error('Erro ao atualizar o produto:', response.data);
          }
        } catch (error) {
          console.error('Erro ao atualizar o produto:', error);
        }
      }
    },

    confirmDelete(product) {
      if (window.confirm('Tem certeza que deseja excluir este produto?')) {
        this.deleteProduct(product);
      }
    },

    async deleteProduct(product) {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.delete('http://localhost:3400/produtos/' + product.id, {
          headers: {
            'Authorization': token,
          },
        });

        if (response.status === 200) {
          console.log('Produto excluído com sucesso!');
          this.getProducts();
        } else {
          console.error('Erro ao excluir o produto:', response.data);
        }
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
@import './Css/Produto.css';
</style>
