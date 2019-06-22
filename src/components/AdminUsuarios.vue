<template>
    <div class="page-header header-filter">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                    <table class="table">
                        <thead>
                        <tr class="table-light">
                            <th scope="col">Usuario</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contraseña</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr v-for="usuario in arrayUsuarios" v-bind:key="usuario.id" class="table-light">
                                <td>{{usuario.user}}</td>
                                <td>{{usuario.email}}</td>
                                <td>{{usuario.password}}</td>
                                <td><button class="btn btn-rose" data-toggle="modal"
                                            data-target="#editar" v-on:click="editarUsuario(usuario.id)">Editar</button></td>
                                <td><button class="btn btn-rose" v-on:click="deleteUsuario(usuario.id)">Eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Editar Usuario</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Usuario</label>
                                    <input type="text" class="form-control" v-model="usuarioModel">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="text" class="form-control" v-model="emailModel">
                            </div>
                            <div class="form-group">
                                <label>Contraseña</label>
                                <input type="text" class="form-control" v-model="contrasenaModel">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" v-on:click="actualizarUsuario(id)" data-dismiss="modal"
                                class="btn btn-rose">Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "AdminUsuarios",
        data: function () {
            return {
                usuarioModel: '',
                emailModel:'',
                contrasenaModel: '',
                arrayUsuarios: [],
                rol:'',
                nombre:'',
                apellido:'',
                pais:'',
                tecnologias:'',
                biografia:'',
                id:''
            }
        },
        components: {},
        methods: {
            FunctUsuarios: function (users) {
                this.arrayUsuarios = [];
                for (let key in users) {
                    this.arrayUsuarios.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol,
                        nombre: users[key].nombre,
                        apellido: users[key].apellido,
                        pais: users[key].pais,
                        tecnologias: users[key].tecnologias,
                        biografia: users[key].biografia,
                        id: key
                    });
                }
            },
            deleteUsuario: function (id) {
                firebase.database().ref('usuarios/' + id).remove().then(() => {
                });
            },
            editarUsuario: function (id) {
                for (let i = 0; i < this.arrayUsuarios.length; i++) {
                    if (this.arrayUsuarios[i].id === id) {
                        this.usuarioModel = this.arrayUsuarios[i].user;
                        this.emailModel = this.arrayUsuarios[i].email;
                        this.contrasenaModel = this.arrayUsuarios[i].password;
                        this.rol = this.arrayUsuarios[i].rol;
                        this.nombre = this.arrayUsuarios[i].nombre;
                        this.apellido = this.arrayUsuarios[i].apellido;
                        this.pais= this.arrayUsuarios[i].pais;
                        this.tecnologias= this.arrayUsuarios[i].tecnologias;
                        this.biografia= this.arrayUsuarios[i].biografia;
                        this.id= this.arrayUsuarios[i].id;
                    }
                }
            },
            actualizarUsuario: function (id) {
                firebase.database().ref('usuarios/' + id).set({
                    user: this.usuarioModel,
                    email: this.emailModel,
                    password: this.contrasenaModel,
                    rol: this.rol,
                    nombre: this.nombre,
                    apellido: this.apellido,
                    pais: this.pais,
                    tecnologias: this.tecnologias,
                    biografia:this.biografia
                })
            },
        },
        mounted() {
            firebase.database().ref('usuarios/').on('value', snapshots => this.FunctUsuarios(snapshots.val()));
        }
    }
</script>

<style scoped>
    .page-header{
        background-image: url("../assets/img/bg7.jpg");
    }
</style>