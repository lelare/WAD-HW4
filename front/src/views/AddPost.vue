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
