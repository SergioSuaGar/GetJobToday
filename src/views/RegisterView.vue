<template>
    <div>
        <Header></Header>
        <Register></Register>
        <Footer></Footer>
    </div>
</template>

<script>
    import Register from "../components/Register";
    import Header from "../components/Header";
    import Footer from "../components/Footer";
    export default {
        name: "RegisterView",
        components: {Header,Register,Footer}
    }
</script>

<style scoped>

</style>