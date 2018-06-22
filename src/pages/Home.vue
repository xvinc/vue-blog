<template>
  <div id="wrapper">
      <h1>xvinc</h1>
      <h2>Design, Code &amp; Things in Between&nbsp;</h2>
      <p><router-link to="/article">Article</router-link></p>
      <!-- <p><router-link to="/bar">Github</router-link></p> -->
      <p><router-link to="/about">About</router-link></p>
      <canvas></canvas>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
#wrapper {
  position: absolute;
  left: 0;
  width: 320px;
  text-align: center;
  top: 50%;
  left: 50%;
  margin-left: -160px;
  margin-top: -110px;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
h1 {
  font-family: "Montserrat", "Helvetica Neue", Arial, sans-serif;
  font-weight: 700;
  font-size: 30px;
  letter-spacing: 9px;
  text-transform: uppercase;
  margin: 12px 0;
  left: 4px;
}
h2 {
  color: #999;
  font-weight: normal;
  font-size: 15px;
  letter-spacing: 0.12em;
  margin-bottom: 30px;
  left: 3px;
}
h1,
h2 {
  position: relative;
}
p {
  font-size: 14px;
  line-height: 2em;
  margin: 0;
  letter-spacing: 2px;
}
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
a {
  color: #999;
  text-decoration: none;
  transition: color 0.2s ease;
}
a:hover {
  color: #f33;
}
</style>
