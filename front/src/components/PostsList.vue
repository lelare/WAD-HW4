<template>
    <div>
        <a :href="'/post/' + post.id" v-for="post in postsList" :key="post.id">
            <article class="box">
                <div class="post_heading">
                    <div class="post_author">
                        <img src="@/assets/user.png" alt="profile-img" />
                        <span>{{ post.username }}</span>
                    </div>
                    <span>{{ formatDate(post.created_time) }}</span>
                </div>
                <div class="post_body" :href="'/post/' + post.id">
                    <p>{{ post.body }}</p>
                </div>
                <div class="post_footer">
                    <img src="@/assets/like.png" alt="comment-icon" />
                    <span>{{ post.like_count }} likes</span>
                    <img src="@/assets/comment.png" alt="comment-icon" />
                    <span>{{ post.comment_count }}</span>
                </div>
            </article>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postsList: [],
        };
    },
    methods: {
        fetchPosts() {
            fetch(`http://localhost:3000/posts/`)
                .then((response) => response.json())
                .then((data) => (this.postsList = data.posts))
                .catch((err) => console.log(err.message));
        },
        formatDate: function (str) {
            let date = new Date(str);

            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        },
    },
    mounted() {
        this.fetchPosts();
        console.log("mounted");
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
        display: block;
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
