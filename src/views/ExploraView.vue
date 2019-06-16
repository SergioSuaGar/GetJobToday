<template>
    <div>
        <HeaderIn></HeaderIn>
        <Explora></Explora>
        <Footer></Footer>
    </div>
</template>

<script>
    import Explora from "../components/Explora";
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    export default {
        name: "ExploraView",
        components: {HeaderIn,Explora,Footer}
    }
</script>

<style scoped>

</style>