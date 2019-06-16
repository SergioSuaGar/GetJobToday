<template>
    <div>
        <HeaderIn></HeaderIn>
        <Chat></Chat>
        <Footer></Footer>
    </div>
</template>

<script>
    import Chat from "../components/Chat";
    import HeaderIn from "../components/HeaderIn";
    import Footer from "../components/Footer";
    export default {
        name: "ChatView",
        components: {Footer, HeaderIn, Chat}
    }
</script>

<style scoped>

</style>