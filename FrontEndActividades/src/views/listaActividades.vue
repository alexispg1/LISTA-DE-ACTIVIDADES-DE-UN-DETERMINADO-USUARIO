<template>
<div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
        <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/panel" role="tab" aria-controls="admin-requests" aria-selected="false">nueva actividad</a>
    </div>
</div>

<div class="container">
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
            <!--<input class="form-control" type="text" placeholder="buscar por nombre" aria-label="Search">-->
            <br/>
            <br/>
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>actividad</th>
                     <th>hora</th>
                     <th class="text-center">fecha</th>
                     <th class="text-center">ver detalles</th>
                     <th class="text-center">cambios</th>
                     <th class="text-center">agregar producto</th>
                    </tr>
                </thead>
                <tr v-for="(actividad,index) in actividades" v-bind:key="index">
                    <td>{{actividad.id}}</td>
                    <td>{{actividad.actividad}}</td>
                    <td>{{actividad.hora}}</td>
                    <td>{{actividad.fecha.substring(0,10)}}</td>      
                    <td class="text-center"><a class='btn btn-warning btn-xs' id="show-btn"   @click="verdetalles(actividad)"><span class="glyphicon glyphicon-edit"></span>detalles</a> </td>
                    <td class="text-center"><a class='btn btn-primary btn-xs' id="show-btn"   @click="showModal(actividad)" ><span class="glyphicon glyphicon-edit"></span>cambios</a></td>
                    <td class="text-center"><a class='btn btn-success btn-xs' id="show-btn"   @click="mostrar(actividad)"  ><span class="glyphicon glyphicon-edit"></span>productos</a></td>
                </tr>
            </table>
            <nav aria-label="pagination">
                <ul class="pagination">
                    <li class="page-item disabled">
                        <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item active" aria-current="page">
                        <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item">
                        <a class="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</div>

 <div>
    <b-modal ref="my-modal" hide-footer title="editar actividades">
      <div class="d-block text-center" >
        <h3>
            <input type="text" v-model="actividad.actividad" class="form-control">
        </h3>
      </div>
      <div class="d-block text-center" >
        <h3>
            <input type="time" v-model="actividad.hora" class="form-control">
        </h3>
      </div>
      <div class="d-block text-center" >
        <h3>
            <input type="text" v-model="date" class="form-control">
        </h3>
      </div>
    <b-button class="mt-2" variant="outline-success" v-on:click="editar"   block >editar</b-button>
    <b-button class="mt-3" variant="outline-danger"  v-on:click="eliminar" block  >eliminar</b-button>
     
    </b-modal>
  </div>

  <div>
    <b-modal ref="my-modal2" hide-footer title="agragar producto">
        <div class="d-block text-center" >
            <h3>
                <input type="text" v-model="producto" placeholder="ingrese el producto" class="form-control">
            </h3>
        </div>
        <b-button class="mt-2" variant="outline-success" v-on:click="insertar" block >agreagar</b-button> 
    </b-modal>
  </div>

</div>  
   

</template>


<script>
import axios from 'axios';
export default {
    data(){
        return{
            url:'https://actividadesjkl.herokuapp.com/api/v1/',
            actividades:[],
            actividad:{
                id:'',
                actividad:'',
                fecha:'',
                hora:''
            },
            date:'',
            producto:'',
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
            this.header = {
				headers: {
					Authorization: "Bearer " + this.token
				}
            }
            axios.get(this.url+"actividad/lista",this.header)
            .then(response=>{
                this.actividades=response.data.actividades;
            })
            .catch(error=>{
                alert("error");
            })
        },
        showModal(actividad) {
            this.$refs['my-modal'].show()
            this.actividad=actividad;
            this.date=actividad.fecha.substring(0,10);
        },
        eliminar() {
            this.$refs['my-modal'].hide()
            axios.delete(this.url+"actividad/delete/"+this.actividad.id)
            .then(response=>{
                this.start();
            })
            .catch(error=>{
                alert("error al eliminar");
            })
        },
        editar() {
            this.$refs['my-modal'].toggle('#toggle-btn')
            var data={
                actividad:this.actividad.actividad,
                fecha:this.date,
                hora:this.actividad.hora,
            }

            axios.put(this.url+"actividad/update/"+this.actividad.id,data)
            .then(response=>{
                this.start();
            })
            .catch(error=>{
               alert(error.response)
            })

        },
        mostrar(actividad){
            this.$refs['my-modal2'].show()
            this.actividad=actividad;
        },
        insertar(){
            this.$refs['my-modal2'].toggle('#toggle-btn')
            this.header = {
				headers: {
					Authorization: "Bearer " + this.token
				}
            }
            var data={
                producto:this.producto,
                actividad_id:this.actividad.id,
            }
            this.producto="";
            axios.post(this.url+"user/producto",data,this.header)
            .then(response=>{
                alert("producto agregado");
            })
            .catch(error=>{
                alert(error.response);
            })
        },
        verdetalles(actividad){
            localStorage.setItem('id_actividad',JSON.stringify(actividad.id))
            this.$router.push("/detalles")
        }
    }
}
</script>

<style>

</style>