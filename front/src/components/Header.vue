<template>
    <header>
        <img src="@/assets/logo.svg" alt="" />
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/contact">Contact</router-link></li>
            </ul>
        </nav>
        <ProfileDropdown v-if="authenticated" />
    </header>
</template>

<script>
import ProfileDropdown from "./ProfileDropdown.vue";
import auth from "@/auth";

export default {
    data: function () {
        return {
            authenticated: auth.authenticated(),
        };
    },
    components: {
        ProfileDropdown,
    },
};
</script>

<style lang="scss" scoped>
header {
    padding: 15px 10px;
    border: 1px solid darkgray;
    background-color: lightgray;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 480px) {
        flex-wrap: wrap;
    }
}

nav {
    ul {
        display: flex;
    }

    @media (max-width: 480px) {
        order: 3;
        margin: 20px auto 0;
    }

    li {
        &:not(:first-child) {
            position: relative;

            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                background-color: gray;
                display: inline-block;
            }
        }

        a {
            padding: 10px 15px;
            color: black;
            font-size: 1em;

            &:hover {
                background-color: #34495e;
                color: #f1f1f1;
                border-radius: 5px;
            }
        }
    }
}
</style>
