<template>
    <div>
        <Header></Header>
        <Login></Login>
        <Footer></Footer>
    </div>
</template>

<script>
    import Login from "../components/Login";
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "LoginView",
        components: {Header,Login,Footer}
    }
</script>

<style scoped>

</style>