<template>
    <div id="fondo" class="page-header header-filter">
        <div class="container">
            <div class="row col-lg-6 col-md-6 ml-auto mr-auto">
                <div class="card card-login">
                    <div class="card-header card-header-rose text-center">
                        <h4 class="card-title">Perfil</h4>
                    </div>
                    <div class="card-body">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Nombre..."
                                   v-model="nombreModel" disabled="disabled">
                            <input type="text" class="form-control" placeholder="Apellido..."
                                   v-model="apellidoModel" disabled="disabled">
                        </div>
                        <div class="input-group">
                            <country-select v-model="paisModel" :country="paisModel" topCountry="ES" disabled="disabled"></country-select>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control"
                                   placeholder="Tecnologias: HTML, Javascript, CSS ..."
                                   v-model="tecnologiasModel" disabled="disabled">
                        </div>
                        <div class="input-group">
                                <textarea class="form-control" rows="5" v-model="bioModel"
                                          placeholder="Sobre mi..." disabled="disabled"></textarea>
                        </div>
                    </div>
                    <div class="footer text-center">
                        <router-link :to="'/mispublicaciones/'">
                            <button class="btn btn-rose" data-dismiss="modal">Volver</button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase'
    export default {
        name: "PerfilPublico",
        data: function () {
            return {
                nombreModel: '',
                apellidoModel: '',
                paisModel:'',
                tecnologiasModel:'',
                bioModel:'',
                arrayUsuarios: []
            }
        },
        methods:{
            infoUsuario: function (ususario) {
                this.arrayUsuarios = [];
                this.arrayUsuarios.push({
                    nombre: ususario.nombre,
                    apellido: ususario.apellido,
                    pais: ususario.pais,
                    tecnologias: ususario.tecnologias,
                    biografia: ususario.biografia,
                });
                this.rellenarPerfil();
            },
            rellenarPerfil: function () {
                for (let i=0;i<this.arrayUsuarios.length;i++){
                    this.nombreModel=this.arrayUsuarios[i].nombre;
                    this.apellidoModel=this.arrayUsuarios[i].apellido;
                    this.paisModel=this.arrayUsuarios[i].pais;
                    this.tecnologiasModel=this.arrayUsuarios[i].tecnologias;
                    this.bioModel=this.arrayUsuarios[i].biografia;
                }
            }
        },
        mounted(){
            firebase.database().ref('usuarios/' + this.$route.params.id).on('value', snapshots => this.infoUsuario(snapshots.val()));
        }
    }
</script>

<style scoped>
    #fondo {
        background-image: url("../assets/img/bg.jpg");
    }
</style>