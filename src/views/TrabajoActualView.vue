<template>
    <div>
        <HeaderIn></HeaderIn>
        <TrabajoActual></TrabajoActual>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    import TrabajoActual from "../components/TrabajoActual";
    export default {
        name: "TrabajoActualView",
        components: {TrabajoActual,Footer, HeaderIn}
    }
</script>

<style scoped>

</style>