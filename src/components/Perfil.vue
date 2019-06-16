<template>
    <div>
        <div id="fondo" class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 ml-auto mr-auto">
                        <div class="card card-login">
                            <div class="card-header card-header-rose text-center">
                                <h4 class="card-title">Información personal</h4>
                            </div>
                            <div class="card-body">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">face</i>
                                        </span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Usuario..."
                                           v-model="usuarioModel">
                                    <input type="text" class="form-control" placeholder="Email..." v-model="emailModel">
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">lock_outline</i>
                                        </span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="Nueva contraseña..."
                                           v-model="contrasenaModel">
                                </div>
                            </div>
                            <div class="footer text-center">
                                <a v-on:click="actualizarPerfilPersonal"
                                   class="btn btn-rose btn-link btn-wd btn-lg">Actualizar</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 ml-auto mr-auto">
                        <div class="card card-login">
                            <div class="card-header card-header-rose text-center">
                                <h4 class="card-title">Mi perfil</h4>
                            </div>
                            <div class="card-body">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">face</i>
                                        </span>
                                    </div>
                                    <input type="text" class="form-control" placeholder="Nombre..."
                                           v-model="nombreModel">
                                    <input type="text" class="form-control" placeholder="Apellido..."
                                           v-model="apellidoModel">
                                </div>
                                <div class="input-group">
                                    Pais: <country-select v-model="paisModel" :country="paisModel" topCountry="ES"></country-select>
                                </div>
                                <div class="input-group">
                                    <input type="text" class="form-control"
                                           placeholder="Tecnologias: HTML, Javascript, CSS ..."
                                           v-model="tecnologiasModel">
                                </div>
                                <div class="input-group">
                                    <textarea class="form-control" rows="5" v-model="bioModel"
                                              placeholder="Sobre mi..."></textarea>
                                </div>

                            </div>
                            <div class="footer text-center">
                                <a v-on:click="actualizarPerfilPublico"
                                   class="btn btn-rose btn-link btn-wd btn-lg">Actualizar</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "Perfil",
        data: function () {
            return {
                // Info Personal
                usuarioModel: '',
                emailModel: '',
                contrasenaModel: '',
                // Info Publica
                nombreModel: '',
                apellidoModel: '',
                paisModel: '',
                tecnologiasModel: '',
                bioModel: '',
                // Otros
                arrayUsuarios: [],
                usuarioOn: '',
                keyUsuario: '',
            }
        },
        methods: {
            actualizarPerfilPersonal: function () {

                firebase.database().ref('usuarios/' + this.keyUsuario).set({
                    user: this.usuarioModel,
                    email: this.emailModel,
                    password: this.contrasenaModel,
                    nombre: this.nombreModel,
                    apellido: this.apellidoModel,
                    tecnologias: this.tecnologiasModel,
                    biografia: this.bioModel,
                    pais: this.paisModel,
                })
            },
            actualizarPerfilPublico: function () {
                firebase.database().ref('usuarios/' + this.keyUsuario).set({
                    user: this.usuarioModel,
                    email: this.emailModel,
                    password: this.contrasenaModel,
                    nombre: this.nombreModel,
                    apellido: this.apellidoModel,
                    tecnologias: this.tecnologiasModel,
                    biografia: this.bioModel,
                    pais: this.paisModel,
                })
            },
            miUsuario: function (users) {
                this.arrayUsuarios = [];
                for (let key in users) {
                    if (users[key].user === this.usuarioOn) {
                        this.arrayUsuarios.push({
                            user: users[key].user,
                            email: users[key].email,
                            password: users[key].password,
                            rol: users[key].rol,
                            idUsuario: key,
                            nombre: users[key].nombre,
                            apellido: users[key].apellido,
                            pais: users[key].pais,
                            tecnologias: users[key].tecnologias,
                            biografia: users[key].biografia,
                        });
                        this.keyUsuario=key;
                    }

                }
                this.rellenarPerfiles();
            },
            rellenarPerfiles: function () {
                for (let i=0;i<this.arrayUsuarios.length;i++){
                    this.usuarioModel=this.arrayUsuarios[i].user;
                    this.emailModel=this.arrayUsuarios[i].email;
                    this.contrasenaModel=this.arrayUsuarios[i].password;
                    this.nombreModel=this.arrayUsuarios[i].nombre;
                    this.apellidoModel=this.arrayUsuarios[i].apellido;
                    this.paisModel=this.arrayUsuarios[i].pais;
                    this.tecnologiasModel=this.arrayUsuarios[i].tecnologias;
                    this.bioModel=this.arrayUsuarios[i].biografia;
                }
            }
        },
        mounted() {
            this.usuarioOn = localStorage.getItem("usuario");
            firebase.database().ref('usuarios/').on('value', snapshots => this.miUsuario(snapshots.val()));
        }
    }
</script>

<style scoped>
    #fondo {
        background-image: url("../assets/img/bg.jpg");
    }
</style>