<template>
    <div>
        <article class="box" v-for="post in postsList" :key="post.id">
            <div class="post_heading">
                <div class="post_author">
                    <img src="@/assets/user.png" alt="profile-img" />
                    <span>{{ post.author_name }}</span>
                </div>
                <span>{{ formatDate(post.created_time) }}</span>
            </div>
            <div class="post_body">
                <img v-if="post.img" :src="post.img.url" :alt="post.img.alt" />
                <p>{{ post.message }}</p>
            </div>
            <div class="post_footer">
                <button v-on:click="IncreaseLike(post.id)"><img src="@/assets/like.png" alt="like-icon" /></button>
                <span>{{ post.like_count }} likes</span>
                <img src="@/assets/comment.png" alt="comment-icon" />
                <span>{{ post.comment_count }}</span>
            </div>
        </article>
    </div>
</template>

<script>
export default {
    computed: {
        postsList() {
            return this.$store.state.posts;
        },
    },
    methods: {
        formatDate: function (str) {
            let date = new Date(str);

            // let dateFormatter = new Intl.DateTimeFormat("en-US", {
            //     year: "numeric",
            //     month: "short",
            //     day: "numeric",
            // });

            // let formattedDateString = dateFormatter.format(date);
            // return formattedDateString;

            // or
            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        },
        IncreaseLike: function (postId) {
            this.$store.dispatch("IncreaseLikeAct", postId);
        },
    },
};
</script>

<style lang="scss" scoped>
article {
    margin-bottom: 20px;
}

.post {
    &_heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        column-gap: 8px;
        row-gap: 4px;

        @media (max-width: 480px) {
            & > span {
                font-size: 14px;
            }
        }
    }

    &_author {
        display: flex;
        align-items: center;
        column-gap: 8px;

        & > img {
            width: 30px;
            height: 30px;
        }
    }

    &_body {
        padding-top: 16px;
        padding-bottom: 16px;

        & > img {
            width: 100%;

            & ~ p {
                margin-top: 10px;
            }
        }

        & > p {
            margin: 0;
        }
    }

    &_footer {
        display: flex;
        align-items: center;

        button {
            padding: 0;
            border: 0;
            background-color: transparent;
            cursor: pointer;
        }

        img {
            width: 24px;
            height: 24px;
            margin-right: 5px;
        }

        span {
            margin-right: 10px;
        }
    }
}
</style>
