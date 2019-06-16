<template>
    <div>>
        <HeaderIn></HeaderIn>
        <PerfilPublico></PerfilPublico>
        <Footer></Footer>
    </div>
</template>

<script>
    import PerfilPublico from "../components/PerfilPublico";
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    export default {
        name: "PerfilPublicoView",
        components: {Footer, HeaderIn, PerfilPublico}
    }
</script>

<style scoped>

</style>