<template>
  <div class="login-container">
    <darkmodeVuearkMode/>
    <div class="login">
      <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input class="form-control" type="text" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label for="password">Senha:</label>
          <input class="form-control" type="password" id="password" v-model="password" required />
        </div>
        <button class="btn btn-primary" type="submit">Entrar</button>
        <span class="dark-mode-text">Dark Mode</span>
      </form>
      <p v-if="loginSuccess" class="success">Usuário logado com sucesso</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import darkmodeVuearkMode from '@/components/darkmode.vue'
import AuthService from '@/service/Authservice';

export default {
  components: {
    darkmodeVuearkMode,
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loginSuccess: false,
    };
  },
  methods: {
    async login() {
      this.error = '';
      this.loginSuccess = false;

      try {
        await AuthService.login(this.email, this.password);
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.message === 'Erro na autenticação') {
          this.error = 'E-mail ou senha incorretos';
        } else {
          this.error = 'E-mail ou senha incorretos';
        }
      }
    },
  },
};
</script>

<style scoped>
.login-container {
    position: relative;
    border: #007BFF;
    height: 100vh;
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../assets/Image.jpg');
    background-size: cover;
    background-position: center;
    opacity: 0.6;
  }
  
  .login {
  position: relative;
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  background: #f8f8ff;
  padding: 20px;
  border-radius: 5px;
  z-index: 1;
  border: 2px solid #007BFF;
}

.form-group {
  margin-bottom: 15px;
}



#email {
  border: 1px solid #007BFF;
  padding: 8px;
  border-radius: 5px;
}
#password {
  border: 1px solid #007BFF;
  padding: 8px;
  border-radius: 5px;
}
  
  .error {
    color: red;
  }
  
  .btn {
    background-color:#007BFF;
    color:#0e0e0e;
    font-size: 14px;
    font-weight: 600;
    border: none !important;
    transition: all linear 160ms;
    cursor: pointer;
    margin: 0 !important;
    width: 100%; 
  }
  
  .btn:hover {
    transform: scale(1.05);
    background-color: #007BFF;
  }

  .dark-mode-toggle {
    position: fixed;
    top: 10px;
    right: 10px;
    color:#000;
    z-index: 1; 
  }

.dark-mode {
  background-color: #333;
  color: white;;
}
</style>