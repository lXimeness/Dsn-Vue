// apiService.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3400';

const ApiService = {
  async getProducts() {
    const response = await axios.get(`${API_BASE_URL}/produtos`, {
      headers: {
        'Authorization': Authservice.gettoken
      }
    });
    return response.data;
  },

  async createProduct(newProduct) {
    const response = await axios.post(`${API_BASE_URL}/produtos`, newProduct, {
      headers: {
        'Authorization': Authservice.gettoken
      }
    });
    return response.data;
  },

  // Implemente outras funções para clientes, usuários, etc.
};

export default ApiService;
