<template>
    <div>
        <div class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                        <div class="card card-login">
                            <div class="card-header card-header-rose text-center">
                                <h4 class="card-title">Iniciar Sesión</h4>
                            </div>
                            <div class="text-center">
                                <router-link to="/register" class="router"><p class="description">¿Aún no estás registrado?</p></router-link>
                                <label id="campoErroneo">{{this.avisoCredenciales}}</label>
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
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">lock_outline</i>
                                        </span>
                                    </div>
                                    <input type="password" class="form-control" placeholder="Contraseña..." v-model="contrasenaModel" v-on:keypress.enter="IniciarSesion">
                                </div>
                            </div>
                            <div class="footer text-center">
                                <button v-on:click="IniciarSesion" class="btn btn-rose btn-link btn-wd btn-lg">Entrar
                                </button>
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
        name: "Login",
        data: function () {
            return {
                usuarioModel: '',
                contrasenaModel: '',
                arrayUsuarios: [],
                avisoCredenciales:'',
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
                        idUsuario: key
                    });
                }
            },
            IniciarSesion: function () {
                for (let i = 0; i < this.arrayUsuarios.length; i++) {
                    if (this.arrayUsuarios[i].user === this.usuarioModel && this.arrayUsuarios[i].password === this.contrasenaModel) {
                        if(this.usuarioModel==='admin'){
                            localStorage.setItem('usuario', this.usuarioModel);
                            this.$router.push('/adminusuarios');
                        }else {
                            localStorage.setItem('usuario', this.usuarioModel);
                            this.$router.push('/explora');
                        }
                    }else{
                        this.avisoCredenciales="Usuario y contraseña incorrectos";
                    }
                }
            }
        },
        mounted() {
            localStorage.removeItem('usuario');
            firebase.database().ref('usuarios/').on('value', snapshots => this.FunctUsuarios(snapshots.val()));
        }
    }
</script>

<style scoped>
    #campoErroneo{
        color:red;
    }
    .page-header{
        background-image: url("../assets/img/bg7.jpg");
    }
</style>