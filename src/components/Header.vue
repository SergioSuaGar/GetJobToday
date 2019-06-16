<template>
    <div class="sidebar-collapse">
        <nav class="navbar navbar-color-on-scroll fixed-top navbar-expand-lg bg-rose" color-on-scroll="100" id="sectionsNav">
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
                <div class="collapse navbar-collapse">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <router-link to="/home" class="router nav-link">Inicio</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/login" class="router nav-link">Entrar</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link to="/register" class="router nav-link">Regístrate</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped>

</style>