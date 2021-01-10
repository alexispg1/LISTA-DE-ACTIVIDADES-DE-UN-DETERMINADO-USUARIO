<template>
<div class="row">
    <div class="col-sm-2 admin-sidebar">
       <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
         <a class="nav-link admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/listaActividades"  role="tab" aria-controls="admin-userss" aria-selected="false">ver actividades</a>
        </div>
    </div>
   
    <div class="container">
	<div id="login" class="modal-dialog">
		<div class="modal-content">
			<div class="modal-body">
				<div class="alert alert-info"><span class="glyphicon glyphicon-log-in"></span> <strong>crea una actividad</strong></div><hr>
				<form id="formLogin" class="form"  role="form" v-on:submit.prevent="insertar"> 
					<label>actividad</label> 
					<div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
						<input type="text" v-model="actividad" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
                    <label>hora</label> 
                    <div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="time"  v-model="hora" min="05:00" max="22:00" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
                     <label>fecha</label> 
                    <div style="margin-bottom: 12px" class="input-group">
						<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="date" v-model="fecha" min="2018-01-01" max="2020-1-1" class="form-control"  data-toggle="tooltip" data-placement="top" required="">
					</div>
					<div class="form-group">
                        <button type="submit"  class="btn btn-primary btn-block">enviar</button>
                    </div>
				</form> 
			</div>
		</div>
	</div>
</div>   



</div>    
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{
            persona:[],
            name:'',
            email:'',
            token:'',
            url:'https://actividadesjkl.herokuapp.com/api/v1/',
            actividad:'',
            hora:'',
            fecha:'',

        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
            this.persona=JSON.parse(localStorage.getItem('persona'));
            this.name=this.persona[0].name;
            this.email=this.persona[0].email;
            this.token=this.persona[0].token;
        },
        insertar(){
            this.header = {
				headers: {
					Authorization: "Bearer " + this.token
				}
            }
            var data={
                actividad:this.actividad,
                hora:this.hora,
                fecha:this.fecha,
            }
            axios.post(this.url+"user/actividad",data,this.header)
            .then(response=>{
                this.$router.push("/listaActividades");
            })
            .catch(error=>{
                alert("servidor caido");
            })
        }
    }
    
}
</script>

<style >
@media screen and (max-width: 480px) {
    .admin-sidebar{
        display: none;
    }
}

@media screen and (min-width: 480px) {
    .admin-tabs{
        display: none;
    }
}

.admin-sidebar{
    max-width: 13%;
}

#sidebar-admin{
    position: fixed;
}

.admin-sidebar-item{
    padding: 1em;
    border-bottom: 1px solid white;
}

.admin-nav{
    background: #49C2B3;
}

.admin-nav-item{
    color: white;
    font-weight:bold;
}

.admin-nav-item:hover{
    color: white;
    background: #41aea1;
}

.admin-nav-item.active{
    background: #53FFE7 !important;
    color: white !important;
}

.admin-header-block{
   background: #434449;
   color: white !important;
   text-align: left;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-color: #ddd;
    border-radius: 4px;
    font-weight: bold;
}

.admin-filter-button{
    background: #78B404;
    color: white !important;
    font-weight: bold;
}

.admin-user-card{
    margin-bottom: 10px;
}
.title-header {padding: .75rem 1.25rem; background-color: #f5f5f5; border-bottom: 1px solid transparent;}
.title-header h3 {font-size: 0.80rem; margin: 0;}
.movies {margin-top: 2rem;}
.img-card {width: 100%; margin-bottom: .40rem;}
.movies {margin-bottom: .60rem;}
.series {margin-bottom: .60rem;}
.footer {padding: 1rem 0; margin-top: 2rem; font-size: 80%; text-align: left;}
.footer p {margin: 0;}
.footer-links {padding-left: 0; margin-bottom: 1rem;}
.footer-links li {display: inline-block;}
.footer a {font-weight: 500; color: inherit;}
.footer-links li + li {margin-left: 1rem;}
/* Bug Bootstrap V4.0.6 - Mobile - SCSS _navbar*/ 
.navbar {display: block;}
</style>