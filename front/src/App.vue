<template>
    <Header />
    <router-view />
    <Footer />
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
    components: {
        Header,
        Footer,
    },
};
</script>
<style lang="scss">
* {
    font-family: sans-serif;
    box-sizing: border-box;
}

main {
    padding: 25px 0;
    display: flex;
    justify-content: center;
    gap: 15px;
}

#app {
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 16px);
}

.box {
    background-color: lightgray;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 15px;
}

.text-center {
    text-align: center;
}

ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

a {
    color: mediumblue;
    text-decoration: none;
}

h2 {
    margin-top: 0;
}

.btn {
    margin: 0 auto;
    padding: 0 20px;
    height: 36px;
    border: 0;
    border-radius: 15px;
    background-color: #5597b3;
    color: #fff;
    transition: 0.5s;
    cursor: pointer;

    &:hover {
        background: #3a5088;
    }

    &:disabled {
        background-color: gray;

        &:hover {
            background: gray;
        }
    }
}

.row-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.mx-0 {
    margin-left: 0;
    margin-right: 0;
}

.mb-5 {
    margin-bottom: 15px;
}
</style>
