<template>
    <div>
        <div class="page-header header-filter" data-parallax="true">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <h1 class="title">Tu nuevo estilo de negocio comienza con nosotros.</h1>
                        <h4>Únete ahora a la comunidad GetJobToday, una nueva forma de negocio en la que tú eres quien decide qué, como y cuando trabajar.Gana tanto dinero como quieras, conoce a otros usuarios y compartid vuestros conocimientos.</h4>
                        <br>
                    </div>
                </div>
            </div>
        </div>
        <div class="main main-raised">
            <div class="container">
                <div class="section text-center">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <h2 class="title">¿Qué te ofrecemos?    </h2>
                            <h5 class="description">Hemos creado una gran comunidad de usuarios donde los expertos en ínformatica pueden realizar proyectos publicados por otros usuarios a cambio de dinero.</h5>
                        </div>
                    </div>
                    <div class="features">
                        <div class="row">
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-success">
                                        <i class="material-icons">verified_users</i>
                                    </div>
                                    <h4 class="info-title">Publicaciones revisadas</h4>
                                    <p>Cada proyecto publicado podrá ser revisado y moderado en caso de cualquier incidencia.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-info">
                                        <i class="material-icons">chat</i>
                                    </div>
                                    <h4 class="info-title">Chat</h4>
                                    <p>Tendrás un chat donde comunicarte con el dueño del proyecto, pregúntale cualquier duda sobre el proyecto o sobre el medio de pago.</p>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="info">
                                    <div class="icon icon-danger">
                                        <i class="material-icons">fingerprint</i>
                                    </div>
                                    <h4 class="info-title">Seguridad</h4>
                                    <p>Trabaja con nosotros sin ningún tipo de miedo, GetJobToday te respaldará en cuakquier tipo de problema.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section section-contacts">
                    <div class="row">
                        <div class="col-md-8 ml-auto mr-auto">
                            <h2 class="text-center title">¿Tienes alguna duda?</h2>
                            <h4 class="text-center description">Estaremos encantados de atender cualquier duda o problema que tengas.</h4>
                            <form class="contact-form">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Tu nombre</label>
                                            <input type="email" class="form-control">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="bmd-label-floating">Tu Email</label>
                                            <input type="email" class="form-control">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleMessage" class="bmd-label-floating">Escribe tu mensaje</label>
                                    <textarea type="email" class="form-control" rows="4" id="exampleMessage"></textarea>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 ml-auto mr-auto text-center">
                                        <button class="btn btn-rose btn-raised">
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    .page-header{
        background-image: url('../assets/img/profile_city.jpg');
    }
</style>