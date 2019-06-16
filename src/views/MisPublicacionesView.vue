<template>
    <div>
        <HeaderIn></HeaderIn>
        <MisPublicaciones></MisPublicaciones>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    import MisPublicaciones from "../components/MisPublicaciones";
    export default {
        name: "MisPublicacionesView",
        components: {MisPublicaciones,Footer, HeaderIn}
    }
</script>

<style scoped>

</style>