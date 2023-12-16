<template>
    <main>
        <section class="box text-center section-small">
            <form @submit.prevent="loginHandler">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" placeholder="Email" required v-model="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        v-model="password"
                    />
                </div>

                <div class="text-center">
                    <button class="btn">Login</button>
                    or
                    <router-link to="/signup"><button class="btn" type="button">Sign up</button></router-link>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
export default {
    name: "Login",

    data: function () {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        loginHandler() {
            var data = {
                email: this.email,
                password: this.password,
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", //  Don't forget to specify this if you need cookies
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    //this.$router.push("/");
                    location.assign("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error");
                });
        },
    },
};
</script>

<style lang="scss" scoped>
@media (min-width: 481px) {
    section.section-small {
        flex: 0 0 300px;
    }
}
.form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    & > input {
        height: 36px;
        padding: 0 12px;
        border: 0;
        border-radius: 15px;
    }

    & > label {
        width: 30%;
        text-align: right;
        margin-right: 10px;
    }
}

.error {
    color: red;
    font-size: 0.8em;
    margin-bottom: 10px;
    text-align: center;
}
</style>
