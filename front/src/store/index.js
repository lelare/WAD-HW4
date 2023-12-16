import { createStore } from "vuex";

export default createStore({
    strict: true,
    state: {
        user: {},
        // posts: [
        //     {
        //         id: 1,
        //         message: "University of Tartu: Delta",
        //         author_name: "Gulnar Mammadli",
        //         img: { url: "https://i.postimg.cc/ZnRWHbhW/delta.jpg", alt: "Delta Centre" },
        //         like_count: 13,
        //         comment_count: 4,
        //         created_time: "2022/09/01 11:45",
        //     },
        // ],
    },
    getters: {},
    mutations: {
        // IncreaseLike: (state, postId) => {
        //     const post = state.posts.find((el) => el.id === postId);
        //     if (post) {
        //         post.like_count += 1;
        //     }
        // },
        // ResetLikes: (state) => {
        //     state.posts.forEach((post) => {
        //         post.like_count = 0;
        //     });
        // },
    },
    actions: {
        // IncreaseLikeAct: (act, postId) => {
        //     setTimeout(function () {
        //         act.commit("IncreaseLike", postId);
        //     }, 100);
        // },
        // ResetLikesAct: (act) => {
        //     setTimeout(function () {
        //         act.commit("ResetLikes");
        //     }, 100);
        // },
    },
    modules: {},
});
