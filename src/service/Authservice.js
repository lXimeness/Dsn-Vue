// services/AuthService.js

import axios from 'axios';

const AuthService = {
  getUsuario :  function() {
    return JSON.parse (window.localStorage.getItem('usuario'));
  },

  setUsuario: function (usuario) {
    window.localStorage.setItem('usuario',JSON.stringify(usuario));
  },

  removeUsuario: function ()  {
    window.localStorage.removeItem('usuario');
  },
  getToken: function () {
    return window.localStorage.getItem('token')
  },
 setToken: function (token) {
  return window.localStorage.setItem('token',token)
 },
   login:async function(email, password)  {
    try {
      const response = await axios.post('http://localhost:3400/login', {
        email,
        senha: password,
      });

      if (response.status === 200) {
        console.log(response.data)
        const data = response.data
        this.setUsuario(data.usuario);
        this.setToken(data.token);
      } else {
        throw new Error('Erro na autenticação');
      }
    } catch (error) {
      throw new Error('Ocorreu um erro durante a autenticação');
    }
  },
};

export default AuthService;
