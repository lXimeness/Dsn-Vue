<template>
  <v-card class="card my-card" elevation="2" transition="scale-transition">
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
  max-width: 400px; 
  margin: auto; 
  border: 2px solid #007BFF;
  border-radius: 8px;
}

.v-leave-scale-transition-to {
  transform: scale(0);
  transition: transform 0.5s;
}
</style>
