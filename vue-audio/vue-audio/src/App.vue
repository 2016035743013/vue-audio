<template>
  <div id="app">
    <VueAudio />
  </div>
</template>

<script>
import VueAudio from './components/VueAudio'
export default {
  name: 'App',
  components: {
    VueAudio
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 600px;
}
</style>
