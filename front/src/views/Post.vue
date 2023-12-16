<template>
    <main>
        <section class="box text-center section-small">
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
                    ></textarea>
                </div>
                <button type="submit">Update</button>
                <button type="button" @click="deletePost">Delete</button>
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
        fetchAPost(id) {
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
    },
    mounted() {
        this.fetchAPost(this.$route.params.id);
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
