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
                                <td><input v-model="usuarioModel" class="form-control">{{usuario.user}}</td>
                                <td><input v-model="emailModel" class="form-control">{{usuario.email}}</td>
                                <td><input v-model="contrasenaModel" class="form-control">{{usuario.password}}</td>
                                <td><button class="btn btn-rose" v-on:click="actualizarUsuario(usuario.id)">Actualizar</button></td>
                                <td><button class="btn btn-rose" v-on:click="deleteUsuario(usuario.id)">Eliminar</button></td>
                            </tr>
                        </tbody>
                    </table>
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
            actualizarUsuario: function (id) {
                for (let i=0;i<this.arrayUsuarios.length;i++){
                    if(this.arrayUsuarios[i].id===id){
                        firebase.database().ref('usuarios/' + id).set({
                            user: this.usuarioModel,
                            email: this.emailModel,
                            password: this.contrasenaModel,
                            rol: this.arrayUsuarios[i].rol,
                            nombre: this.arrayUsuarios[i].nombre,
                            apellido: this.arrayUsuarios[i].apellido,
                            pais: this.arrayUsuarios[i].pais,
                            tecnologias: this.arrayUsuarios[i].tecnologias,
                            biografia:this.arrayUsuarios[i].biografia
                        })
                    }
                }
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