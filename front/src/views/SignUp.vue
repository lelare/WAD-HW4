<template>
    <main>
        <section class="box text-center section-small">
            <form @submit.prevent="signUpHandler">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" placeholder="Username" required v-model="username" />
                </div>
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
                        @keyup="validateForm"
                    />
                </div>
                <!-- <div v-if="validatePassword" class="error">{{ validatePassword }}</div> -->

                <div class="text-center">
                    <button class="btn">Sign up</button>
                </div>
            </form>
        </section>
    </main>
</template>

<script>
export default {
    name: "SignUpView",

    data: function () {
        return {
            username: "",
            email: "",
            password: "",
            // validatePassword: "",
        };
    },
    methods: {
        // validateForm() {
        //     let regex = /^[A-Z](?=.*[0-9])(?=.*_)(?=.*[a-z].*[a-z])[A-Za-z0-9_]*$/;
        //     let isLengthInvalid = this.password.length < 8 || this.password.length > 15;
        //     let isRegexValid = regex.test(this.password);

        //     if (isLengthInvalid) {
        //         this.validatePassword = "Password must be between 8-15 chars";
        //     } else if (!isRegexValid) {
        //         this.validatePassword =
        //             "The password is not valid! It must contain a combination of the first letter being Uppercase,at least 2 Lowercase characters, 1 Digits (0-9), and _";
        //     } else {
        //         this.validatePassword = "";
        //     }
        // },
        signUpHandler() {
            var data = {
                username: this.username,
                email: this.email,
                password: this.password,
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/auth/signup", {
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
                    this.$router.push("/");
                    //location.assign("/");
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
.error {
    color: red;
    font-size: 0.8em;
    margin-bottom: 10px;
    text-align: center;
}
</style>
