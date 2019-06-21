import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/LoginView'
import Register from './views/RegisterView'
import Explora from './views/ExploraView'
import MisPublicaciones from './views/MisPublicacionesView'
import TrabajoActual from './views/TrabajoActualView'
import Perfil from './views/PerfilView'
import PerfilPublico from './views/PerfilPublicoView'
import Chat from './views/ChatView'
import Home from './views/HomeView'
import AdminUsuarios from './views/AdminUsuariosView'
import AdminPublicaciones from './views/AdminPublicacionesView'


Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/mispublicaciones',
            name: 'MisPublicaciones',
            component: MisPublicaciones
        },
        {
            path: '/trabajoactual',
            name: 'TrabajoActual',
            component: TrabajoActual
        },
        {
            path: '/explora',
            name: 'Explora',
            component: Explora
        },
        {
            path: '/PerfilPublico/:id',
            name: 'PerfilPublico',
            component: PerfilPublico
        },
        {
            path: '/Chat/:id',
            name: 'ChatView',
            component: Chat
        },
        {
            path: '/perfil',
            name: 'Perfil',
            component: Perfil
        },
        {
            path: '/adminusuarios',
            name: 'AdminUsuarios',
            component: AdminUsuarios
        },
        {
            path: '/adminpublicaciones',
            name: 'AdminPublicaciones',
            component: AdminPublicaciones
        },
        {
            path: '/*',
            name: 'Login',
            component: Login
        },
    ]
})
