<template>
<div class="login-form">
        <form v-on:submit.prevent="register">
            <h2 class="text-center">registrarse</h2>  

            <div class="form-group">
                <input type="tex"  v-model="username" class="form-control" placeholder="user name" required="required">
            </div>

            <div class="form-group">
                <input type="email"  v-model="email" class="form-control" placeholder="email adress" required="required">
            </div>
            <div class="form-group">
                <input type="password" v-model="password" class="form-control" placeholder="Password" required="required">
            </div>

            <div class="form-group">
                <button type="submit"  class="btn btn-primary btn-block">registrarse</button>
            </div>
            <div class="clearfix">
                <label class="pull-left checkbox-inline"></label><br/>
                <a href="/" class="pull-right">regresar</a>
            </div>        
        </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            username:'',
            email:'',
            password:'',
            url:'https://actividadesjkl.herokuapp.com/api/v1/',
            persona:[],
        }
    },
    mounted(){

    },
    methods:{
        register:function(){
            var data={
                username:this.username,
                email:this.email,
                password:this.password,
            }
            axios.post(this.url+"user/register",data)
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
              alert("error intentelo mas tarde")  
            })
        }
    }
}
</script>


<style>

</style>