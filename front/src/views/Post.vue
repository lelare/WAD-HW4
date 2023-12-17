<template>
    <main>
        <section class="box text-center section-small">
            <h2 class="text-center">A Post</h2>
            <form @submit.prevent="updatePost">
                <div class="form-group">
                    <label for="message" id="msg-label">Post body</label>
                    <textarea
                        id="message"
                        name="message"
                        placeholder="textarea"
                        rows="5"
                        required
                        v-model="post.body"
                        :readonly="!isUserPost"
                    ></textarea>
                </div>
                <div class="row-between">
                    <button class="btn" type="submit" @click="updatePost" :disabled="!isUserPost">Update</button>
                    <button class="btn" type="button" @click="deletePost" :disabled="!isUserPost">Delete</button>
                </div>
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
    computed: {
        isUserPost() {
            const storedToken = localStorage.getItem("authToken");
            return this.post.user_id === storedToken;
        },
    },
    methods: {
        fetchPost(id) {
            fetch(`http://localhost:3000/posts/${id}`)
                .then((response) => response.json())
                .then((data) => (this.post = data))
                .catch((err) => console.log(err.message));
        },
        updatePost() {
            fetch(`http://localhost:3000/posts/${this.post.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.post),
            })
                .then((response) => {
                    console.log(response.data);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        deletePost() {
            fetch(`http://localhost:3000/posts/${this.post.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    console.log(response.data);
                    this.$router.push("/");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        this.fetchPost(this.$route.params.id);
    },
};
</script>
