import { createStore } from "vuex";

export default createStore({
    strict: true,
    state: {
        posts: [
            {
                id: 1,
                message: "University of Tartu: Delta",
                author_name: "Gulnar Mammadli",
                img: { url: "https://i.postimg.cc/ZnRWHbhW/delta.jpg", alt: "Delta Centre" },
                like_count: 13,
                comment_count: 4,
                created_time: "2022/09/01 11:45",
            },
            {
                id: 2,
                message: "Tartu 2022",
                author_name: "Leyla Rahimli",
                img: { url: "https://i.postimg.cc/BvLNY34w/tartu-old-city.jpg", alt: "Tartu city" },
                like_count: 2,
                comment_count: 4,
                created_time: "2022/10/22 10:32",
            },
            {
                id: 3,
                message: "Does anyone know in which room the lab is today?",
                author_name: "Darius Stevens",
                img: null,
                like_count: 0,
                comment_count: 1,
                created_time: "2022/11/05 18:20",
            },
            {
                id: 4,
                message: "Happy New Year!",
                author_name: "Lacie Lindsay",
                img: { url: "https://i.postimg.cc/rFkbDDMy/new-year.jpg", alt: "New Year" },
                like_count: 10,
                comment_count: 14,
                created_time: "2022/12/31 23:30",
            },
            {
                id: 5,
                message: "Some people are worth melting for.",
                author_name: "Ross Fuentes",
                img: { url: "https://i.postimg.cc/pybs81g1/frozen.webp", alt: "Snowman" },
                like_count: 15,
                comment_count: 3,
                created_time: "2023/02/28 10:32",
            },
            {
                id: 6,
                message: "Azerbaijani's traditional holiday: Novruz",
                author_name: "Guler Hasanli",
                img: { url: "https://i.postimg.cc/cL8XTZsk/novruz.jpg", alt: "Novruz holiday" },
                like_count: 5,
                comment_count: 8,
                created_time: "2023/03/21 11:45",
            },
            {
                id: 7,
                message:
                    "Who wants to go to the cinema on Sunday? I heard that The Ice Age Adventures of Buck Wild is very interesting.",
                author_name: "Muhammad Stein",
                img: null,
                like_count: 4,
                comment_count: 12,
                created_time: "2023/04/04 13:20",
            },
            {
                id: 8,
                message: "Lost my ID card around the dormitory. Did anyone find?",
                author_name: "Brandon Wood",
                img: { url: "https://i.postimg.cc/9Xn0VjhB/raatuse.jpg", alt: "Raatuse dormitory" },
                like_count: 6,
                comment_count: 9,
                created_time: "2023/08/07 22:53",
            },
            {
                id: 9,
                message: "Is there anyone who is interested in hiking?",
                author_name: "Safa Lam",
                img: null,
                like_count: 6,
                comment_count: 15,
                created_time: "2023/09/17 16:13",
            },
            {
                id: 10,
                message: "Looking for someone who can teach me German",
                author_name: "Ridwan Middleton",
                img: null,
                like_count: 2,
                comment_count: 3,
                created_time: "2023/10/21 19:48",
            },
        ],
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
