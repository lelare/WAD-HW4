<template>
    <main>
        <section class="box text-center section-small">
            <h2 class="text-center">Add Post</h2>
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
                <button class="btn" type="submit" id="post-submit">Create post</button>
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
                user_id: "",
            },
        };
    },
    methods: {
        addPost() {
            var data = {
                body: this.post.body,
                user_id: localStorage.getItem("authToken"),
            };
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((response) => {
                    console.log(response.data);
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
