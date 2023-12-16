<template>
    <div class="profile">
        <button class="dropbtn" v-on:click="toggleDropdown">
            <img src="@/assets/user.png" alt="Profile picture" />
        </button>
        <div class="dropdown-content" :class="{ show: isShown }">
            <a href="#">John Paul</a>
            <a href="#">paul@ut.ee</a>
            <a href="#" @click="logoutHandler">logout</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShown: false,
        };
    },
    methods: {
        toggleDropdown: function () {
            this.isShown = !this.isShown;
        },
        logoutHandler() {
            fetch("http://localhost:3000/auth/logout", {
                credentials: "include", //  Don't forget to specify this if you need cookies
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    console.log("jwt removed");
                    //console.log('jwt removed:' + auth.authenticated());
                    this.$router.push("/login");
                    //location.assign("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error logout");
                });
        },
    },
};
</script>

<style scoped lang="scss">
.dropbtn {
    background-color: lightgray;
    color: grey;
    padding: 0px;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    height: 40px;
    width: 40px;

    & > img {
        width: 100%;
        height: 100%;
    }
}
.dropdown {
    &-content {
        position: absolute;
        right: 8px;
        z-index: 1;
        display: none;
        min-width: 160px;
        margin-top: 15px;
        border-radius: 15px;
        background-color: lightgray;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        overflow: hidden;

        a {
            color: black;
            padding: 12px 10px;
            text-decoration: none;
            display: block;

            &:hover {
                background-color: #ddd;
            }
        }

        &.show {
            display: block;
        }
    }
}
</style>
