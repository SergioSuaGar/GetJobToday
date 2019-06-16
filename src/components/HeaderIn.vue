<template>
    <div class="sidebar-collapse">
        <nav class="navbar navbar-color-on-scroll fixed-top navbar-expand-lg bg-rose">
            <div class="container">
                <div class="navbar-translate">
                    <a class="navbar-brand" href="#">
                        GetJobToday </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse ">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/explora" class="router nav-link ">Explora</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/mispublicaciones" class="router nav-link">Mis Publicaciones</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/trabajoactual" class="router nav-link">Trabajo Actual</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/perfil" class="router nav-link">Mi Perfil</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login" class="router nav-link" >Salir</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "HeaderIn"
    }
</script>

<style scoped>
</style>