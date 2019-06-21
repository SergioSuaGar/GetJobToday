<template>
    <div>
    <HeaderAdmin></HeaderAdmin>
    <AdminUsuarios></AdminUsuarios>
    <Footer></Footer>
    </div>
</template>

<script>
    import HeaderAdmin from "../components/HeaderAdmin";
    import Footer from "../components/Footer";
    import AdminUsuarios from "../components/AdminUsuarios";
    export default {
        name: "AdminUsuariosView",
        components: {Footer, HeaderAdmin, AdminUsuarios}
    }
</script>

<style scoped>

</style>