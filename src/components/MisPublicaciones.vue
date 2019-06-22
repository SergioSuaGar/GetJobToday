<template>
    <div id="fondo" class="page-header header-filter">
        <div class="container">
            <div class="row col-lg-8 col-md-10 ml-auto mr-auto">
                <button type="button" class="btn btn-rose col-12" data-toggle="modal" data-target="#publicar">Publicar
                    Proyecto
                </button>
                <div v-for="item in arrayProyectos" v-bind:key="item.id" class="col-12">
                    <div class="card card-nav-tabs text-center cardProyecto col-lg-10 col-md-10 ml-auto mr-auto">
                        <div class="card-header card-header-rose">
                            {{item.titulo}}
                        </div>
                        <div class="card-body cardBodyProyecto">
                            <p class="card-text">Tecnologías necesarias: {{item.lenguaje}}</p>
                        </div>
                        <div class="card-footer text-muted row">
                            <button v-on:click="editarProyecto(item.id)" class="btn btn-rose col-md-2" data-toggle="modal"
                                    data-target="#editar">Editar
                            </button>
                            <button v-on:click="deleteProyecto(item.id)" class="btn btn-rose col-md-3">Eliminar</button>
                            <button v-on:click="verInteresados(item.id)" class="btn btn-rose col-md-4" data-toggle="modal"
                                    data-target="#interesados">Ver interesados
                            </button>
                            <button type="button" class="btn btn-rose col-md-2" id="chatBoton"><router-link :to="'/Chat/' + item.id">Chat</router-link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="publicar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Publicar un nuevo Proyecto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Título</label>
                                    <input id="cajaTitulo" type="text" class="form-control" v-model="titulo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Descripción</label>
                                <textarea id="cajaDescripcion" class="form-control" rows="5"
                                          v-model="descripcion"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tecnologías necesarias</label>
                                <input id="cajaLenguaje" type="text" class="form-control"
                                       placeholder="Vuejs, HTML, Css, Node..." v-model="lenguaje">
                            </div>
                            <div class="form-group">
                                <label class="label-control">Fecha de entrega</label>
                                <input id="cajaFecha" type="text" class="form-control datetimepicker"
                                       v-model="fecha">
                            </div>
                            <div class="form-group">
                                <label>Precio</label>
                                <input id="cajaPrecio" type="number" class="form-control" placeholder="€"
                                       v-model="precio">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" v-on:click="addProyecto" data-dismiss="modal"
                                class="btn btn-rose">Publicar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal 2-->
        <div class="modal fade" id="editar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel2"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel2">Editar el proyecto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Título</label>
                                    <input type="text" class="form-control" v-model="auxTitulo">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Descripción</label>
                                <textarea class="form-control" rows="5" v-model="auxDescripcion"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tecnologías necesarias</label>
                                <input type="text" class="form-control" placeholder="Vuejs, HTML, Css, Node..."
                                       v-model="auxLenguaje">
                            </div>
                            <div class="form-group">
                                <label class="label-control">Fecha de entrega</label>
                                <input type="text" class="form-control datetimepicker" v-model="auxFecha"/>
                            </div>
                            <div class="form-group">
                                <label>Precio</label>
                                <input type="number" class="form-control" placeholder="€" v-model="auxPrecio">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                        <button type="button" v-on:click="actualizarProyecto()" data-dismiss="modal"
                                class="btn btn-rose">Actualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal 2-->
        <div class="modal fade" id="interesados" tabindex="-1" role="dialog"
             aria-labelledby="exampleModalLabel3"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel3"></h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card card-nav-tabs text-center cardProyecto" v-for="usuario in this.arrayInteresados"
                             v-bind:key="usuario.id">
                            <div class="card-header card-header-rose">
                                Usuario: {{usuario.user}}
                            </div>
                            <div class="card-body cardBodyProyecto">
                                <div class="input-group">
                                    <p class="card-text">Tecnologías conocidas: {{usuario.lenguaje}}</p>
                                </div>
                                <div class="card-footer text-muted row">
                                    <router-link :to="'/PerfilPublico/' + usuario.interesado" class="col-md-6">
                                        <button class="btn btn-rose" data-dismiss="modal">Perfil</button>
                                    </router-link>
                                    <button v-on:click="asignarProyecto(usuario.interesado, usuario.idProyecto)" class="btn btn-rose col-md-5">
                                        Asignar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-rose" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "MisPublicaciones",
        data: function () {
            return {
                titulo: '',
                descripcion: '',
                lenguaje: '',
                fecha: '',
                precio: '',
                arrayProyectos: [],
                usuarioOn: '',
                auxArrayProyectos: [],
                auxTitulo: '',
                auxDescripcion: '',
                auxLenguaje: '',
                auxFecha: '',
                auxPrecio: '',
                auxId: "",
                arrayInteresados: [],
                arrayUsuarios: [],
            }
        },
        methods: {
            addProyecto: function () {
                if (this.titulo !== '' && this.descripcion !== '' && this.fecha !== '' && this.lenguaje !== '' && this.precio !== '') {
                    firebase.database().ref('proyectos/').push({
                        titulo: this.titulo,
                        descripcion: this.descripcion,
                        fecha: this.fecha,
                        lenguaje: this.lenguaje,
                        precio: this.precio,
                        autor: this.usuarioOn

                    }).then(() => {
                        this.titulo = '';
                        this.descripcion = '';
                        this.fecha = '';
                        this.lenguaje = '';
                        this.precio = '';
                        this.autor = '';
                    });
                }
            },
            deleteProyecto: function (id) {
                firebase.database().ref('proyectos/' + id).remove().then(() => {
                });
            },
            editarProyecto: function (id) {
                for (let i = 0; i < this.arrayProyectos.length; i++) {
                    if (this.arrayProyectos[i].id === id) {
                        this.auxTitulo = this.arrayProyectos[i].titulo;
                        this.auxDescripcion = this.arrayProyectos[i].descripcion;
                        this.auxLenguaje = this.arrayProyectos[i].lenguaje;
                        this.auxFecha = this.arrayProyectos[i].fecha;
                        this.auxPrecio = this.arrayProyectos[i].precio;
                        this.auxId = this.arrayProyectos[i].id;
                    }
                }
            },
            actualizarProyecto: function () {
                firebase.database().ref('proyectos/' + this.auxId).set({
                    titulo: this.auxTitulo,
                    descripcion: this.auxDescripcion,
                    fecha: this.auxFecha,
                    lenguaje: this.auxLenguaje,
                    precio: this.auxPrecio,
                    autor: this.usuarioOn
                });
            },
            listarProyectos: function (task) {
                this.arrayProyectos = [];
                for (let key in task) {
                    if (this.usuarioOn === task[key].autor) {
                        this.arrayProyectos.push({
                            titulo: task[key].titulo,
                            descripcion: task[key].descripcion,
                            fecha: task[key].fecha,
                            lenguaje: task[key].lenguaje,
                            precio: task[key].precio,
                            id: key
                        });
                    }
                }
            },
            listarInteresados: function (val, id) {
                this.arrayInteresados = [];
                for (let key in val) {
                    this.arrayInteresados.push({
                        interesado: val[key].interesado,
                        user: val[key].user,
                        lenguaje: val[key].lenguaje,
                        idProyecto: id
                    });
                }
            },
            verInteresados: function (id) {
                firebase.database().ref('proyectos/' + id + '/interesados/').on('value', snapshots => this.listarInteresados(snapshots.val(), id));
                for (let i = 0; i < this.arrayInteresados; i++) {
                    for (let j = 0; j < this.arrayUsuarios; j++) {
                        if (this.arrayInteresados[i].interesado === this.arrayUsuarios[j].id) {
                            console.log('');
                        }
                    }
                }
            },
            listarUsuarios: function (users) {
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
            asignarProyecto: function (idUsuario, idProyecto) {
                firebase.database().ref('usuarios/' + idUsuario + '/trabajoactual/').push({
                    proyecto: idProyecto,
                }).then(() => {
                });
                firebase.database().ref('proyectos/' + idProyecto + '/seleccionado/').push({
                    seleccionado: idUsuario,
                }).then(() => {
                });
            }
        },
        mounted() {
            this.arrayProyectos = [];
            this.usuarioOn = localStorage.getItem("usuario");
            firebase.database().ref('proyectos/').on('value', snapshots => this.listarProyectos(snapshots.val()));
            firebase.database().ref('usuarios/').on('value', snapshots => this.listarUsuarios(snapshots.val()));
        }
    }

</script>

<style scoped>
    .cardProyecto {
        margin-top: 60px;
    }

    .cardBodyProyecto {
        margin-top: 15px;
    }

    #fondo {
        background-image: url("../assets/img/city.jpg");
    }
    a{
        color:white;
    }
</style>