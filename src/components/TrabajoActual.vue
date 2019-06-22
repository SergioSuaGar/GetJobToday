<template>
    <div id="fondo" class="page-header header-filter">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 ml-auto mr-auto">
                    <div v-for="info in this.arrayInfoProyectos" v-bind:key="info.id">
                        <div class="card card-nav-tabs text-center cardProyecto col-lg-5 col-md-5 ml-auto mr-auto">
                            <div class="card-header card-header-rose">
                                {{info.titulo}}
                            </div>
                            <div class="card-body cardBodyProyecto">
                                <p class="card-text">Tecnologías necesarias: {{info.lenguaje}}</p>
                            </div>
                            <div class="card-footer text-muted">
                                <router-link :to="'/Chat/' + info.id">
                                    <button type="button" class="btn btn-rose">Chatear</button>
                                </router-link>
                                <button type="button" v-on:click="leerMas(info.id)" class="btn btn-rose"
                                        data-toggle="modal" data-target="#leerMas">Leer más
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="leerMas" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Información del Proyecto</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label>Título</label>
                                    <input id="cajaTitulo" type="text" class="form-control" v-model="titulo"
                                           disabled="disabled">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Descripción</label>
                                <textarea id="cajaDescripcion" class="form-control" rows="5"
                                          v-model="descripcion" disabled="disabled"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Tecnologías necesarias</label>
                                <input id="cajaLenguaje" type="text" class="form-control"
                                       placeholder="Vuejs, HTML, Css, Node..." v-model="lenguaje" disabled="disabled">
                            </div>
                            <div class="form-group">
                                <label class="label-control">Fecha de entrega</label>
                                <input id="cajaFecha" type="text" class="form-control datetimepicker"
                                       v-model="fecha" disabled="disabled">
                            </div>
                            <div class="form-group">
                                <label>Precio</label>
                                <input id="cajaPrecio" type="number" class="form-control" placeholder="€"
                                       v-model="precio" disabled="disabled">
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
        name: "TrabajoActual",
        data: function () {
            return {
                localUser: '',
                localUserKey: '',
                arrayUsuarios: [],
                arrayTrabajosAsignados: [],
                tituloModel: '',
                tecnologiasModel: '',
                arrayProyectos: [],
                arrayInfoProyectos: [],
                titulo: '',
                descripcion: '',
                lenguaje: '',
                fecha: '',
                precio: '',
            }
        },
        methods: {
            listarUsuarios: function (users) {
                this.localUser = localStorage.getItem('usuario');
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
                for (let i = 0; i < this.arrayUsuarios.length; i++) {
                    if (this.localUser === this.arrayUsuarios[i].user) {
                        this.localUserKey = this.arrayUsuarios[i].idUsuario;
                    }
                }
            },
            listarTrabajosAsignados: function (jobs) {
                this.arrayTrabajosAsignados = [];
                for (let key in jobs) {
                    this.arrayTrabajosAsignados.push({
                        proyecto: jobs[key].proyecto,
                        id: key,
                    });
                }
            },
            listarProyectos: function (task) {
                this.arrayProyectos = [];
                for (let key in task) {
                    this.arrayProyectos.push({
                        titulo: task[key].titulo,
                        descripcion: task[key].descripcion,
                        fecha: task[key].fecha,
                        lenguaje: task[key].lenguaje,
                        precio: task[key].precio,
                        id: key
                    });
                }
                for (let i = 0; i < this.arrayProyectos.length; i++) {
                    for (let j = 0; j < this.arrayTrabajosAsignados.length; j++) {
                        if (this.arrayProyectos[i].id === this.arrayTrabajosAsignados[j].proyecto) {
                            this.arrayInfoProyectos.push({
                                titulo: this.arrayProyectos[i].titulo,
                                descripcion: this.arrayProyectos[i].descripcion,
                                fecha: this.arrayProyectos[i].fecha,
                                lenguaje: this.arrayProyectos[i].lenguaje,
                                precio: this.arrayProyectos[i].precio,
                                id: this.arrayProyectos[i].id
                            });
                        }
                    }
                }
            },
            leerMas: function (id) {
                for (let i = 0; i < this.arrayInfoProyectos.length; i++) {
                    if (this.arrayInfoProyectos[i].id === id) {
                        this.titulo = this.arrayInfoProyectos[i].titulo;
                        this.descripcion = this.arrayInfoProyectos[i].descripcion;
                        this.lenguaje = this.arrayInfoProyectos[i].lenguaje;
                        this.fecha = this.arrayInfoProyectos[i].fecha;
                        this.precio = this.arrayInfoProyectos[i].precio;
                    }
                }
            },
        },
        mounted() {
            firebase.database().ref('usuarios/').on('value', snapshots => this.listarUsuarios(snapshots.val()));
            firebase.database().ref('usuarios/' + this.localUserKey + '/trabajoactual/').on('value', snapshots => this.listarTrabajosAsignados(snapshots.val()));
            firebase.database().ref('proyectos/').on('value', snapshots => this.listarProyectos(snapshots.val()));
        }
    }
</script>

<style scoped>
    #fondo {
        background-image: url("../assets/img/bg7.jpg");
    }
</style>