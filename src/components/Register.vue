<template>
    <div>
        <div class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
                        <div class="card card-login">
                            <div class="card-header card-header-rose text-center">
                                <h4 class="card-title">Formulario de registro</h4>
                            </div>
                            <router-link to="/login" class="router"><p class="description text-center">¿Ya tienes cuenta?</p></router-link>
                            <div class="card-body">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">face</i>
                                        </span>
                                    </div>
                                    <input v-on:blur="checkUsuario" type="text" class="form-control" placeholder="Usuario..."
                                           v-model="usuarioModel" >
                                    <label class="campoValido">{{this.campoValidoUsuario}}</label>
                                    <label class="campoNoValido">{{this.campoNoValidoUsuario}}</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">mail</i>
                                        </span>
                                    </div>
                                    <input  v-on:blur="checkEmail" type="email" class="form-control" placeholder="Email..."
                                            v-model="emailModel">
                                    <label class="campoValido">{{this.campoValidoEmail}}</label>
                                    <label class="campoNoValido">{{this.campoNoValidoEmail}}</label>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="material-icons">lock_outline</i>
                                        </span>
                                    </div>
                                    <input v-on:blur="checkContrasena" type="password" class="form-control" placeholder="Contraseña..."
                                           v-model="contrasenaModel">
                                    <label class="campoValido">{{this.campoValidoContrasena}}</label>
                                    <label class="campoNoValido">{{this.campoNoValidoContrasena}}</label>
                                </div>
                            </div>
                            <div class="footer text-center">
                                <a v-on:click="AddNewUser" class="btn btn-rose btn-link btn-wd btn-lg">Enviar</a>
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
        name: "Register",
        data: function () {
            return {
                usuarioModel: '',
                emailModel: '',
                contrasenaModel: '',
                arrayUsuarios: [],
                validUserRegister: false,
                validEmailRegister: false,
                validPasswordRegister: false,
                campoValidoUsuario:'',
                campoNoValidoUsuario:'',
                campoValidoEmail:'',
                campoNoValidoEmail:'',
                campoValidoContrasena:'',
                campoNoValidoContrasena:'',
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
            AddNewUser: function () {{
                if(this.validUserRegister===true && this.validEmailRegister===true && this.validPasswordRegister===true){
                    firebase.database().ref('usuarios/').push({
                        user: this.usuarioModel,
                        email: this.emailModel,
                        password: this.contrasenaModel,
                        rol: 'trabajador',
                        nombre: '',
                        apellido:'',
                        pais:'',
                        tecnologias:'',
                        biografia:''
                    }).then(() => {
                        this.usuarioModel = '';
                        this.emailModel = '';
                        this.contrasenaModel = '';
                        this.validUserRegister=false;
                        this.validEmailRegister=false;
                        this.validPasswordRegister=false;
                        this.$router.push('/LoginView');
                    });
                }else{

                }
            }
            },
            checkUsuario: function () {
                if (this.usuarioModel !== '') {
                    for (let i=0; i< this.arrayUsuarios.length;i++) {
                        if (this.usuarioModel === this.arrayUsuarios[i].user) {
                            this.campoValidoUsuario='';
                            this.campoNoValidoUsuario='Usándose';
                            this.validUserRegister = false;
                            break;
                        } else {
                            this.campoNoValidoUsuario='';
                            this.campoValidoUsuario='Válido';
                            this.validUserRegister = true;
                        }
                    }
                }else{
                    this.campoValidoUsuario='';
                    this.campoNoValidoUsuario='Inválido';
                    this.validUserRegister=false;
                }
            },
            checkEmail: function () {
                if (this.emailModel !== '') {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (re.test(String(this.emailModel).toLowerCase())) {
                        this.campoNoValidoEmail='';
                        this.campoValidoEmail='Válido';
                        this.validEmailRegister = true;
                    } else {
                        this.campoValidoEmail='';
                        this.campoNoValidoEmail='Ivválido';
                        this.validEmailRegister = false;
                    }
                }else{
                    this.campoValidoEmail='';
                    this.campoNoValidoEmail='Ivválido';
                    this.validEmailRegister = false;
                }
            },
            checkContrasena: function () {
                if (this.contrasenaModel !== '') {
                    if (this.contrasenaModel.length > 5) {
                        this.campoNoValidoContrasena='';
                        this.campoValidoContrasena='Válido';
                        this.validPasswordRegister = true;
                    } else {
                        this.campoValidoContrasena='';
                        this.campoNoValidoContrasena='Inválido';
                        this.validPasswordRegister = false;
                    }
                }else{
                    this.campoValidoContrasena='';
                    this.campoNoValidoContrasena='Inválido';
                    this.validPasswordRegister = false;
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
        background-image: url("../assets/img/bg2.jpg");
    }
    .campoValido{
        color:lawngreen;
    }
    .campoNoValido{
        color:red;;
    }
</style>