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
          this.getProducts(); 
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
 .button-group {
    margin-top: 10px; 
  }
  
  .edit-button,
  .delete-button {
    background-color: #007BFF;
    color: #fff;
    border: none;
    padding: 5px 10px;
    margin-right: 10px; 
  }
  
  .edit-button:hover,
  .delete-button:hover {
    background-color: #0056b3;
  }
  

  .form-container {
    background-color: #007BFF;
    color: #fff;
    padding: 20px;
    border-radius: 5px;
  }

  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  .form-group input[type="text"],
  .form-group input[type="number"] {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
    border: 1px solid #007BFF;
    border-radius: 5px;
    background-color: #fff; 
    color: #000;
  }
  

  .product-list {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px 0;
    background-color: #01060a;
    color: #fff;
    border-radius: 5px;
  }
  
  .product-list li {
    margin-bottom: 10px; 
  }

  .go-back-button {
    position: fixed;
    bottom: 10px;
    right: 10px;
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .go-back-button:hover {
    background-color: #0056b3;
  }

</style>
