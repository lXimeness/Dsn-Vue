
<template>
  <body color-scheme="isDark ? 'dark' : 'ligth' ">
    <label class="switch">
  <input type="checkbox" @click="toggleDark()">
  <span class="slider round"></span>
</label>
  </body>
</template>
    <script setup>
    import {useDark, useToggle} from '@vueuse/core'


  const isDark = useDark({
    selector: "body",
    attribute:"color-scheme",
    valueDark: 'dark',
    valueLight:'ligth',
  })

const toggleDark = useToggle(isDark)

    </script>

<style>


/* The switch - the box around the slider */
.switch {
  position: fixed;
  top: 10px;
  right: 10px;
  display: inline-block;
  width: 60px;
  height: 34px;
}
.dark-mode-container {
  display: flex;
  align-items: center;
}

.dark-mode-text {
  position: fixed;
  top: 10px;
  right: 65px; /* Ajuste conforme necessário para a distância da direita */
  color: #00FFFF;
  padding: 5px;
  font-size: 16px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider { 
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 100%;
}
[color-scheme='dark']{
  background-image: url("../assets/Back.jpg") ;
  background-size: cover;
  height: 100vh;
  background-position: center;
}
[color-scheme='ligth']{
  background-image: url("../assets/background_darkmode.jpg") ;
  background-size: cover;
  height: 100vh;
  background-position: center;
}
</style>