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
                <button class="btn" type="submit">Update</button>
                <button class="btn" type="button" @click="deletePost">Delete</button>
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

    & > textarea {
        // height: 36px;
        padding: 12px;
        border: 0;
        border-radius: 15px;
    }

    & > label {
        width: 30%;
        text-align: right;
        margin-right: 10px;
    }
}
</style>
