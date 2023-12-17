<template>
    <main>
        <aside></aside>
        <section>
            <PostsList />
            <div class="row-between">
                <router-link to="/addPost"><button class="btn">Add Post</button></router-link>
                <button class="btn mx-0" v-on:click="DeleteAllPosts">Delete all</button>
            </div>
        </section>
        <aside></aside>
    </main>
</template>

<script>
import PostsList from "@/components/PostsList.vue";

export default {
    name: "HomeView",
    components: {
        PostsList,
    },
    methods: {
        DeleteAllPosts() {
            var data = {
                user_id: localStorage.getItem("authToken"),
            };
            fetch(`http://localhost:3000/posts/all/${data.user_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => {
                    response.json();
                    console.log(response.data);
                    window.location.reload();
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
aside {
    flex: 0.5 1 0;
    background-color: lightgray;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 15px;
}

section {
    flex: 2 0 0;
}

@media (max-width: 480px) {
    section {
        flex: 0 0 85vw;
    }
    aside {
        display: none;
    }
}
</style>
