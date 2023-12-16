<template>
    <main>
        <aside></aside>
        <section>
            <PostsList />
            <div class="row-between">
                <router-link to="/addPost"><button class="btn">Add Post</button></router-link>
                <button class="btn mx-0">Delete all</button>
                <button class="btn mx-0" v-on:click="ResetLikes">Reset Likes</button>
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
        // ResetLikes: function () {
        //     this.$store.dispatch("ResetLikesAct");
        // },
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
