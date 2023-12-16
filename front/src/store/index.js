import { createStore } from "vuex";

export default createStore({
    strict: true,
    state: {
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
        //     {
        //         id: 2,
        //         message: "Tartu 2022",
        //         author_name: "Leyla Rahimli",
        //         img: { url: "https://i.postimg.cc/BvLNY34w/tartu-old-city.jpg", alt: "Tartu city" },
        //         like_count: 2,
        //         comment_count: 4,
        //         created_time: "2022/10/22 10:32",
        //     },
        // ],
    },
    getters: {},
    mutations: {
        IncreaseLike: (state, postId) => {
            const post = state.posts.find((el) => el.id === postId);
            if (post) {
                post.like_count += 1;
            }
        },
        ResetLikes: (state) => {
            state.posts.forEach((post) => {
                post.like_count = 0;
            });
        },
    },
    actions: {
        IncreaseLikeAct: (act, postId) => {
            setTimeout(function () {
                act.commit("IncreaseLike", postId);
            }, 100);
        },
        ResetLikesAct: (act) => {
            setTimeout(function () {
                act.commit("ResetLikes");
            }, 100);
        },
    },
    modules: {},
});
