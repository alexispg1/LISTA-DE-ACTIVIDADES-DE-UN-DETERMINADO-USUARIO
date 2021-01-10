<template>
<div class="row">
    <div class="col-sm-2 admin-sidebar">
        <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
            <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill"  href="http://localhost:8080/listaActividades" role="tab" aria-controls="admin-requests" aria-selected="false">actividades</a>
        </div>
    </div>

    <div class="container">
        <div class="row col-md-12 col-md-offset-0 custyle">
            <div class="panel panel-primary">
                <br/>
                <br/>
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th>ID</th>
                     <th>producto</th>
                     <th class="text-center">id actividad</th>
                     <th class="text-center">eliminar</th>
                    </tr>
                </thead>
                <tr v-for="(producto,index) in listaProductos" v-bind:key="index">
                    <td>{{producto.id}}</td>
                    <td>{{producto.producto}}</td>
                    <td>{{"activad ala que pertenece "+producto.actividad_id}}</td>
                    <td class="text-center"><a class='btn btn-danger btn-xs' id="show-btn"   @click="eliminar(producto)"  ><span class="glyphicon glyphicon-edit"></span>eliminar</a></td>
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
</div>
</template>


<script>
import axios from 'axios';
export default {
    data(){
        return{
            actividad_id:'',
            url:'https://actividadesjkl.herokuapp.com/api/v1/',
            listaProductos:[]

        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
            this.actividad_id=JSON.parse(localStorage.getItem('id_actividad'))
            var data={
                id:this.actividad_id,
            }
            axios.post(this.url+"producto/lista",data)
            .then(response=>{
                this.listaProductos=response.data.productos;
            })
            .catch(error=>{
                alert("error en el servidor");
            })

        },
        eliminar(producto){
            axios.delete(this.url+"producto/delete/"+producto.id)
            .then(response=>{
                this.start();
            })
            .catch(error=>{
                alert("error en el servidor");
            })
        }
    }
}
</script>

<style >

</style>
