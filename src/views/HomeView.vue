<template>
    <div>
        <Header></Header>
        <Home></Home>
        <Footer></Footer>
    </div>
</template>

<script>
    import Footer from "../components/Footer";
    import Header from "../components/Header";
    import Home from "../components/Home";
    export default {
        name: "HomeView",
        components: {Home,Header,Footer}
    }
</script>

<style scoped>

</style>