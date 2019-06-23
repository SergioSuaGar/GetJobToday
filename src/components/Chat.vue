<template>
    <div>
        <div class="page-header header-filter">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                        <div class="card card-login">
                            <div class="card-header card-header-rose text-center">
                                <h4 class="card-title">Chat</h4>
                            </div>
                            <div class="card-body">
                                <div class="card card-login" v-for="item in arrayTodosChat" v-bind:key="item.autor">
                                    <div class="card-body" v-if="usuarioOn===item.autor" >
                                        <p class="text-right">{{item.mensaje}}</p>
                                        <p class="text-right">Enviado por: {{item.autor}}</p>
                                    </div>
                                    <div class="card-body" v-else >
                                        <p class="text-left">{{item.mensaje}}</p>
                                        <p class="text-left">Enviado por: {{item.autor}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="footer text-center">
                                <input v-model="mensajeModel" type="text" class="form-control col-11 ml-1" v-on:keypress.enter="enviarMensaje(mensajeModel)"/>
                                <a v-on:click="enviarMensaje(mensajeModel)" class="btn btn-rose btn-link btn-wd btn-lg">Enviar</a>
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
        name: "Chat",
        data: function () {
            return {
                arrayProyectos: [],
                arrayProyecto: [],
                arraySeleccionado: [],
                idSeleccionado: '',
                arrayUsuarioSeleccionado: [],
                arrayTRUEXD: [],
                mensajeModel:"",
                usuarioOn: '',
                arrayTodosChat: []
            }
        },
        methods: {
            FunctProjectos: function (task) {
                this.arrayProyectos = [];
                for (let key in task) {
                    this.arrayProyectos.push({
                        autor: task[key].autor,
                        titulo: task[key].titulo,
                        descripcion: task[key].descripcion,
                        fecha: task[key].fecha,
                        lenguaje: task[key].lenguaje,
                        precio: task[key].precio,
                        id: key
                    });
                }
                for (let i = 0; i < this.arrayProyectos.length; i++) {
                    if (this.arrayProyectos[i].id === this.$route.params.id) {
                        this.arrayProyecto.push({
                            autor: this.arrayProyectos[i].autor,
                            titulo: this.arrayProyectos[i].titulo,
                            descripcion: this.arrayProyectos[i].descripcion,
                            fecha: this.arrayProyectos[i].fecha,
                            lenguaje: this.arrayProyectos[i].lenguaje,
                            precio: this.arrayProyectos[i].precio,
                            id: this.arrayProyectos[i].id
                        });
                    }
                }
            },
            FunctSeleccionado: function (val) {
                this.arraySeleccionado = [];
                for (let key in val) {
                    this.arraySeleccionado.push({
                        seleccionado: val[key].seleccionado,
                    });
                }
                this.idSeleccionado = this.arraySeleccionado[0].seleccionado;
            },
            Functlel: function (val) {
                this.arrayUsuarioSeleccionado = [];
                for (let key in val) {
                    this.arrayUsuarioSeleccionado.push({
                        user: val[key].user,
                        email: val[key].email,
                        password: val[key].password,
                        rol: val[key].rol,
                        tecnologias: val[key].tecnologias,
                        idUsuario: key
                    });
                }
                for (let i = 0; i < this.arrayUsuarioSeleccionado.length; i++) {
                    if (this.arrayUsuarioSeleccionado[i].idUsuario === this.idSeleccionado) {
                        this.arrayTRUEXD.push({
                            user: this.arrayUsuarioSeleccionado[i].user,
                            email: this.arrayUsuarioSeleccionado[i].email,
                            password: this.arrayUsuarioSeleccionado[i].password,
                            rol: this.arrayUsuarioSeleccionado[i].rol,
                            tecnologias: this.arrayUsuarioSeleccionado[i].tecnologias,
                            idUsuario: this.arrayUsuarioSeleccionado[i].idUsuario
                        });
                    }
                }

            },
            enviarMensaje: function (mensajeModel) {
                this.mensajeModel="";
                this.usuarioOn = localStorage.getItem('usuario');
                for (let i = 0; i < this.arrayTRUEXD.length; i++) {
                    if (this.arrayTRUEXD[i].user === this.usuarioOn) {
                        firebase.database().ref('chat/' + this.$route.params.id).push({
                            mensaje: mensajeModel,
                            autor: this.arrayTRUEXD[i].user,
                            idAutor: this.arrayTRUEXD[i].idUsuario
                        });
                    }
                }
                for (let j = 0; j < this.arrayProyectos.length; j++) {
                    if (this.usuarioOn === this.arrayProyecto[j].autor) {
                        firebase.database().ref('chat/' + this.$route.params.id).push({
                            mensaje: mensajeModel,
                            autor: this.arrayProyecto[j].autor,
                        });
                    }
                }
            },
            FunctChats: function (val) {
                this.arrayTodosChat = [];

                for (let key in val) {
                    this.arrayTodosChat.push({
                        mensaje: val[key].mensaje,
                        autor: val[key].autor,
                        idAutor: val[key].idAutor
                    });
                }
            }
        },
        mounted() {
            firebase.database().ref('proyectos/').on('value', snapshots => this.FunctProjectos(snapshots.val()));
            firebase.database().ref('proyectos/' + this.$route.params.id + '/seleccionado/').on('value', snapshots => this.FunctSeleccionado(snapshots.val()));
            firebase.database().ref('usuarios/').on('value', snapshots => this.Functlel(snapshots.val()));
            firebase.database().ref('chat/' + this.$route.params.id).on('value', snapshots => this.FunctChats(snapshots.val()));
        }
    }
</script>

<style scoped>
    .page-header{
        background-image: url("../assets/img/bg2.jpg");
    }
    .mensaje{
        margin-top: 5px;
    }
</style>