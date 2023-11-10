<template>
  <div class="login-container">
    <darkmodeVuearkMode/>
    <div class="background-image"></div>
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
@import './Css/Login.css';
</style>