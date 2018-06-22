<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  watch: {
    '$route' (to, from) {
      console.log(to)
      // const toDepth = to.path.split('/').length
      // const fromDepth = from.path.split('/').length
      // this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  }
}
</script>

<style>
@import url('./assets/init.css');
body{
  margin: 0;
  padding: 0;
  /* background: #f6f6f6; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
li {
    list-style: none;
}
ul {
    padding: 0;
    margin: 0;
}
a {
    color: #000;
    text-decoration: none;
    font-weight: 500;
}
</style>
