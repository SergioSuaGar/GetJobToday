<template>
    <div>
        <HeaderAdmin></HeaderAdmin>
        <AdminPublicaciones></AdminPublicaciones>
        <Footer></Footer>
    </div>
</template>

<script>
    import HeaderAdmin from "../components/HeaderAdmin";
    import Footer from "../components/Footer";
    import AdminPublicaciones from "../components/AdminPublicaciones";
    export default {
        name: "AdminPublicacionesView",
        components: {Footer, HeaderAdmin, AdminPublicaciones}
    }
</script>

<style scoped>

</style>