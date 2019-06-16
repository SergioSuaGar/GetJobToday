<template>
    <div>
        <HeaderIn></HeaderIn>
        <Perfil></Perfil>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    import Perfil from "../components/Perfil";
    export default {
        name: "PerfilView",
        components: {Perfil, Footer, HeaderIn}
    }
</script>

<style scoped>

</style>