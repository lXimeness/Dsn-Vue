<template>
  <div>
    <nav>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:#0056b3;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #502c37;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
