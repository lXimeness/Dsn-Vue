<template>
  <v-card class="my-card" elevation="2" transition="scale-transition">
    <v-card-title class="text-h5">{{ title }}</v-card-title>
    <v-card-text>
      <v-responsive>
        <p class="card-text">{{ value }}</p>
      </v-responsive>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    value: Number,
  },
};
</script>

<style scoped>
.my-card {
  max-width: 400px; /* Defina a largura máxima do card conforme necessário */
  margin: auto; /* Centraliza o card na tela */
}

/* Adicione estilos de animação conforme necessário */
.v-enter-scale-transition,
.v-leave-scale-transition-to {
  transform: scale(0);
  transition: transform 0.5s;
}
</style>
