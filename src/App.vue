<template>
  <div id="app">
    <mainView/>
  </div>
</template>

<script>
import mainView from "./view/mainView";

export default {
  name: "App",
  components: {
    mainView
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
