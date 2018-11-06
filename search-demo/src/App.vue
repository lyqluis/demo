<template>
  <div id="app">
    <!--<Logo></Logo>-->
    <search class='search'></search>
  </div>
</template>

<script>
import Search from "./components/search";
//import Logo from './components/logo'

export default {
  name: "app",
  components: {
    Search
    //Logo,
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./assets/Claude_Monet.jpg") no-repeat;
  height: 100vh;
  background-size: 100% 100%;
}
.search{
  position: relative;
  top: -50px;
}
@media screen and (max-width: 768px) {
  div{
    margin-top: -10%;
  }
}
</style>
