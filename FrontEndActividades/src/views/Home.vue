<template>
 <div class="login-form">
    <form v-on:submit.prevent="login">
        <h2 class="text-center">iniciar sesion</h2>       
        <div class="form-group">
             <input type="email" v-model="email" class="form-control" placeholder="email" required="required">
        </div>
        <div class="form-group">
            <input type="password"  v-model="password" class="form-control" placeholder="password" required="required">
        </div>
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">iniciar sesion</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"></label><br/>
            <a href="#" class="pull-right">olvidaste tu contraseña?</a>
        </div>        
    </form>
    <p class="text-center"><a href="/register">crear una cuenta</a></p>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data(){
    return{
      email:'',
      password:'',
      url:'https://actividadesjkl.herokuapp.com/api/v1/',
      persona:[],
    }
  },
  mounted(){

  },
  methods:{
    login(){
      var data={
        email:this.email,
        password:this.password,
      }
      axios.post(this.url+"user/login",data)
      .then(response=>{
        var name=response.data.usuario.username;
        var email=response.data.usuario.email;
        var token=response.data.usuario.token;
        this.persona.push({
          name:name,
          email:email,
          token:token,
        })
        localStorage.setItem('persona',JSON.stringify(this.persona));
        this.$router.push("/panel");
      })
      .catch(error=>{
        alert("error en las credenciales ");
      })
    }
  }
  
}
</script>

<style >
.login-form {
		width: 500px;
    	margin: 30px auto;
	}
    .login-form form {
    	margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .btn {        
        font-size: 15px;
        font-weight: bold;
    }

</style>