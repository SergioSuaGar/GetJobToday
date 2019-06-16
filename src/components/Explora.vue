<template>
    <div id="fondoExplora" class="page-header">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-md-12 ml-auto mr-auto">
                    <div v-for="item in arrayExplora" v-bind:key="item.id">
                        <div class="card card-nav-tabs text-center cardProyecto col-md-8 ml-auto mr-auto">
                            <div class="card-header card-header-rose">
                                {{item.titulo}}
                            </div>
                            <div class="card-body cardBodyProyecto">
                                <p class="card-text">Tecnologías necesarias: {{item.lenguaje}}</p>
                            </div>
                            <div class="card-footer text-muted row">
                                <button v-on:click="leerMas(item.id)" class="btn btn-rose col-md-6" data-toggle="modal"
                                        data-target="#leerMas">Leer más
                                </button>
                                <button v-on:click="estoyInteresado(item.id)" class="btn btn-rose col-md-5">
                                    Solicitar
                                </button>
                                <!-- <button v-on:click="dejarEstarInteresado(item.id)" class="btn btn-rose">Ya no estoy
                                    interesado
                                </button> -->
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="leerMas" tabindex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel2"
                         aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel2">Información del Proyecto</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <div class="form-row">
                                            <div class="form-group col-md-6">
                                                <label>Título</label>
                                                <input type="text" class="form-control" v-model="auxTitulo"
                                                       disabled="disabled">
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label>Descripción</label>
                                            <textarea class="form-control" rows="5" v-model="auxDescripcion"
                                                      disabled="disabled"></textarea>
                                        </div>
                                        <div class="form-group">
                                            <label>Tecnologías necesarias</label>
                                            <input type="text" class="form-control"
                                                   placeholder="Vuejs, HTML, Css, Node..."
                                                   v-model="auxLenguaje" disabled="disabled">
                                        </div>
                                        <div class="form-group">
                                            <label class="label-control">Fecha de entrega</label>
                                            <input type="text" class="form-control" v-model="auxFecha"
                                                   disabled="disabled">
                                        </div>
                                        <div class="form-group">
                                            <label>Precio</label>
                                            <input type="number" class="form-control" placeholder="€"
                                                   v-model="auxPrecio" disabled="disabled">
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
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'

    export default {
        name: "Explora",
        data: function () {
            return {
                arrayUsuarios: [],
                arrayExplora: [],
                titulo: '',
                descripcion: '',
                lenguaje: '',
                fecha: '',
                precio: '',
                usuarioOn: '',
                flagInteresado: true,
                keyRegistrado: '',
                arrayInteresados: [],
                desuscribirse: '',
                auxTitulo: '',
                auxDescripcion: '',
                auxLenguaje: '',
                auxFecha: '',
                auxPrecio: '',
                auxId: "",
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
                    if (this.usuarioOn === users[key].user) {
                        this.lenguaje = users[key].tecnologias;
                    }
                }

                for (let i = 0; i < this.arrayUsuarios.length; i++) {
                    if (this.arrayUsuarios[i].user === this.usuarioOn) {
                        this.keyRegistrado = this.arrayUsuarios[i].idUsuario;
                    }
                }
            },
            FunctExplora: function (task) {
                this.arrayExplora = [];
                for (let key in task) {
                    if (this.usuarioOn !== task[key].autor) {
                        this.arrayExplora.push({
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
            leerMas: function (id) {
                for (let i = 0; i < this.arrayExplora.length; i++) {
                    if (this.arrayExplora[i].id === id) {
                        this.auxTitulo = this.arrayExplora[i].titulo;
                        this.auxDescripcion = this.arrayExplora[i].descripcion;
                        this.auxLenguaje = this.arrayExplora[i].lenguaje;
                        this.auxFecha = this.arrayExplora[i].fecha;
                        this.auxPrecio = this.arrayExplora[i].precio;
                        this.auxId = this.arrayExplora[i].id;
                    }
                }
            },
            estoyInteresado: function (id) {
                //console.log(this.keyRegistrado);
                firebase.database().ref('proyectos/' + id + '/interesados/').push({
                    interesado: this.keyRegistrado,
                    user: this.usuarioOn,
                    lenguaje: this.lenguaje,
                }).then(() => {
                });
            },
            dejarEstarInteresado: function (id) {
                firebase.database().ref('proyectos/' + id + '/interesados/').on('value', snapshots => this.listarInteresados(snapshots.val()));
                firebase.database().ref('proyectos/' + id + '/interesados/' + this.desuscribirse).remove().then(() => {
                });
            },
            listarInteresados: function (interesados) {
                this.arrayInteresados = [];
                for (let key in interesados) {
                    this.arrayInteresados.push({
                        interesado: interesados[key].interesado,
                        id: key
                    });
                }
                for (let i = 0; i < this.arrayInteresados.length; i++) {
                    if (this.arrayInteresados[i].interesado === this.keyRegistrado) {
                        this.desuscribirse = this.arrayInteresados[i].id;
                    }
                }
            }
        },
        mounted() {
            this.arrayExplora = [];
            this.usuarioOn = localStorage.getItem("usuario");
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