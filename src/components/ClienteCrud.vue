<template>
<div class="Cliente">
  <form v-if="clienteEditando" @submit.prevent="editCliente">
  <div class="form-group">
    <label for="clienteNome">Nome:</label>
    <input type="text" id="clienteNome" v-model="clienteEditando.nome" required>
  </div>
  <div class="form-group">
    <label for="clienteDataCadastro">Data de Cadastro:</label>
    <input type="date" id="clienteDataCadastro" v-model="clienteEditando.dataCadastro" required>
  </div>
  <div class="form-group">
    <label for="clienteCpf">CPF ou CNPJ:</label>
    <input type="text" id="clienteCpf" v-model="clienteEditando.cpfOuCnpj" required>
  </div>
  <div class="form-group">
    <label for="clienteEmail">E-mail:</label>
    <input type="email" id="clienteEmail" v-model="clienteEditando.email" required>
  </div>
  <div class="form-group">
    <label for="clienteTelefone">Telefone:</label>
    <input type="text" id="clienteTelefone" v-model="clienteEditando.telefone" required>
  </div>
  <div class="form-group">
    <label for="clienteIdUsuario">ID do Usuário:</label>
    <input type="number" id="clienteIdUsuario" v-model="clienteEditando.idUsuario" required>
  </div>
  <button class="button" type="submit" @click="atualizarCliente">Atualizar Cliente</button>
  <button class="cancel-button" @click="cancelarEdicao">Cancelar</button>
</form>



  <div class ="container">
  <form @submit.prevent="addCliente" class="form-container">
    <h2>Adicionar Cliente</h2>
    <div class="form-group">
      <label for="clienteNome">Nome:</label>
      <input type="text" id="clienteNome" v-model="newCliente.nome" required>
    </div>




    <div class="form-group">
      <label for="clienteDataCadastro">Data de Cadastro:</label>
      <input type="date" id="clienteDataCadastro" v-model="newCliente.dataCadastro" required>
    </div>
    <div class="form-group">
      <label for="clienteCpf">CPF ou CNPJ:</label>
      <input type="text" id="clienteCpf" v-model="newCliente.cpfOuCnpj" required>
    </div>
    <div class="form-group">
      <label for="clienteEmail">E-mail:</label>
      <input type="email" id="clienteEmail" v-model="newCliente.email" required>
    </div>
    <div class="form-group">
      <label for="clienteTelefone">Telefone:</label>
      <input type="text" id="clienteTelefone" v-model="newCliente.telefone" required>
    </div>
    <div class="form-group">
      <label for="clienteIdUsuario">ID do Usuário:</label>
      <input type="number" id="clienteIdUsuario" v-model="newCliente.idUsuario" required>
    </div>


    <button class="button" type="submit">Adicionar Cliente</button>

    <button class="go-back-button" @click="goBack">Voltar</button>
      </form>


<div class="cliente-list">
<h2>Lista de Clientes</h2>
<ul>
  <li v-for="cliente in clientes" :key="cliente.id">
    Nome: {{ cliente.nome }} - CPF/CNPJ: {{ cliente.cpfOuCnpj }} - E-mail: {{ cliente.email }} - Telefone: {{ cliente.telefone }}
    - Data de Cadastro: {{ cliente.dataCadastro }}
    <div class="button-group">
      <button class="edit-button" @click="iniciarEdicao(cliente)">Editar</button>
        <button class="delete-button" @click="confirmDelete(cliente)">Excluir</button>
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
name: 'Cliente',
data() {
  return {
    newCliente: {
      nome: '',
      dataCadastro: '',
      cpfOuCnpj: '',
      email: '',
      telefone: '',
      idUsuario: 0,
    },
    clientes: [],
    clienteEditando: null,  
  };
},
created() {
  this.getClientes(); 
},
methods: {
  iniciarEdicao(cliente) {
    
    this.clienteEditando = { ...cliente };
},
  async getClientes() {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.get('http://localhost:3400/clientes', {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 200) {
        this.clientes = response.data;
      } else {
        console.error('Erro ao buscar a lista de clientes:', response.data);
      }
    } catch (error) {
      console.error('Erro ao buscar a lista de clientes:', error);
    }
  },

  async addCliente() {
    try {
      const token = window.localStorage.getItem('token');
      const response = await axios.post('http://localhost:3400/clientes', this.newCliente, {
        headers: {
          'Authorization': token
        }
      });

      if (response.status === 200) {
        console.log('Cliente adicionado com sucesso!');
        this.newCliente = {
          nome: '',
          dataCadastro: '',
          cpfOuCnpj: '',
          email: '',
          telefone: '',
          idUsuario: 0,
        };

        this.getClientes(); 
      } else {
        console.error('Erro ao adicionar o cliente:', response.data);
      }
    } catch (error) {
      console.error('Erro ao adicionar o cliente:', error);
    }
  },
  confirmDelete(cliente) {
      if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
        this.deleteCliente(cliente);
      }
    },

    async deleteCliente(cliente) {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.delete('http://localhost:3400/clientes/' + cliente.id, {
      headers: {
        'Authorization': token
      }
    });

    if (response.status === 200) {
      console.log('Cliente excluído com sucesso!');
      this.getClientes();
    } else {
      console.error('Erro ao excluir o cliente:', response.data);
    }
  } catch (error) {
    console.error('Erro ao excluir o cliente:', error);
  }
},


async atualizarCliente() {
      try {
        const token = window.localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:3400/clientes/${this.clienteEditando.id}`,
          this.clienteEditando,  
          {
            headers: {
              'Authorization': token
            }
          }
        );

        if (response.status === 200) {
          console.log('Cliente editado com sucesso!');
          this.getClientes();
          this.clienteEditando = null;  
        } else {
          console.error('Erro ao editar o cliente:', response.data);
        }
      } catch (error) {
        console.error('Erro ao editar o cliente:', error);
      }
    },


async editCliente(cliente) {
  try {
    const token = window.localStorage.getItem('token');
    const response = await axios.put(`http://localhost:3400/clientes/${cliente.id}`, cliente, {
      headers: {
        'Authorization': token
      }
    });

    if (response.status === 200) {
      console.log('Cliente editado com sucesso!');
     
      this.clienteEditando = response.data;
    } else {
      console.error('Erro ao editar o cliente:', response.data);
    }
  } catch (error) {
    console.error('Erro ao editar o cliente:', error);
  }
},
goBack() 
    {
      this.$router.go(-1);
    },
  }
  };
</script>

<style scoped>
@import './Css/Cliente.css';
</style>