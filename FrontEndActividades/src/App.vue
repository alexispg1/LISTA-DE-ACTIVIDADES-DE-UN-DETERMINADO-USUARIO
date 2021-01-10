<template>
<div >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">registro de actividades</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="#">Bienvenido<span class="sr-only">(current)</span></a>
        </li>
      </ul>
        <form class="form-inline my-2 my-lg-0" v-on:submit.prevent="salir">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">cerrar secion</button>
        </form>
      </div>
    </nav>
<div>
<router-view/>
</div>
    </div>

</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import Home from './views/Home.vue';

export default Vue.extend({
  name: 'app',
components: {
    HelloWorld,
    Home,
  },
  data(){
    return{

    }
  },
  methods:{
    salir(){
      this.$router.push("/");
    }

  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
