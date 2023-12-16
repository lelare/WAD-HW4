<template>
    <main>
        <section class="box text-center section-small">
            <form @submit.prevent="addPost">
                <div class="form-group">
                    <label for="message" id="msg-label">Post body</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="textarea"
                        rows="5"
                        required
                        v-model="post.body"
                    ></textarea>
                </div>
                <button type="submit" id="post-submit">Create post</button>
            </form>
        </section>
    </main>
</template>

<script>
export default {
    data() {
        return {
            post: {
                body: "",
            },
        };
    },
    methods: {
        addPost() {
            var data = {
                body: this.post.body,
            };
            // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    console.log(response.data);
                    // redirect to /allposts view
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                    console.log("error");
                });
        },
    },
};
</script>

<style lang="scss">
.form-group {
    display: flex;
    margin-bottom: 15px;

    & > label {
        width: 20%;
        text-align: right;
        margin-right: 10px;
    }
}
</style>
