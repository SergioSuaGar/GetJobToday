<template>
    <div id="fondoExplora" class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                    <div v-for="item in arrayExplora" v-bind:key="item.id">
                        <div class="card card-nav-tabs text-center cardProyecto col-md-8 ml-auto mr-auto">
                            <div class="card-header card-header-rose">
                                {{item.titulo}}
                            </div>
                            <div class="card-body cardBodyProyecto">
                                <p class="card-text">Tecnologías necesarias: {{item.lenguaje}}</p>
                            </div>
                            <div class="card-footer text-muted row ml-auto mr-auto">
                                <button v-on:click="editarProyecto(item.id)" class="btn btn-rose col-md-5" data-toggle="modal"
                                        data-target="#editar">Editar
                                </button>
                                <button v-on:click="deleteProyecto(item.id)" class="btn btn-rose col-md-6">Eliminar</button>
                            </div>
                        </div>
                    </div>
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
                                            <input type="text" class="form-control datetimepicker" v-model="auxFecha">
                                        </div>
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input type="number" class="form-control" placeholder="€" v-model="auxPrecio">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                                    <button type="button" v-on:click="actualizarProyecto(auxId)" data-dismiss="modal"
                                            class="btn btn-rose">Actualizar
                                    </button>
                                </div>
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
        name: "AdminPublicaciones",
        data: function () {
            return {
                arrayUsuarios: [],
                arrayExplora: [],
                titulo: '',
                descripcion: '',
                lenguaje: '',
                fecha: '',
                precio: '',
                keyRegistrado: '',
                auxTitulo: '',
                auxDescripcion: '',
                auxLenguaje: '',
                auxFecha: '',
                auxPrecio: '',
                auxId: '',
                autor:'',
            }
        },
        methods: {
            FunctUsuarios: function (users) {
                this.arrayUsuarios = [];
                for (let key in users) {
                    this.arrayUsuarios.push({
                        user: users[key].user,
                        email: users[key].email,
                        password: users[key].password,
                        rol: users[key].rol,
                        tecnologias: users[key].tecnologias,
                        idUsuario: key
                    });
                }
            },
            FunctExplora: function (task) {
                this.arrayExplora = [];
                for (let key in task) {
                    this.arrayExplora.push({
                        titulo: task[key].titulo,
                        descripcion: task[key].descripcion,
                        fecha: task[key].fecha,
                        lenguaje: task[key].lenguaje,
                        precio: task[key].precio,
                        id: key,
                        autor: task[key].autor
                    });
                }
            },
            deleteProyecto: function (id) {
                firebase.database().ref('proyectos/' + id).remove().then(() => {
                });
            },
            editarProyecto: function (id) {
                for (let i = 0; i < this.arrayExplora.length; i++) {
                    if (this.arrayExplora[i].id === id) {
                        this.auxTitulo = this.arrayExplora[i].titulo;
                        this.auxDescripcion = this.arrayExplora[i].descripcion;
                        this.auxLenguaje = this.arrayExplora[i].lenguaje;
                        this.auxFecha = this.arrayExplora[i].fecha;
                        this.auxPrecio = this.arrayExplora[i].precio;
                        this.auxId = this.arrayExplora[i].id;
                        this.autor= this.arrayExplora[i].autor;
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
                    autor: this.autor
                });
            },
        },
        mounted() {
            this.arrayExplora = [];
            firebase.database().ref('usuarios/').on('value', snapshots => this.FunctUsuarios(snapshots.val()));
            firebase.database().ref('proyectos/').on('value', snapshots => this.FunctExplora(snapshots.val()));
        }
    }
</script>

<style scoped>
    #fondoExplora {
        background-image: url("../assets/img/bg.jpg");
    }
    .cardProyecto {
        margin-top: 60px;
    }

    .cardBodyProyecto {
        margin-top: 15px;
    }

</style>