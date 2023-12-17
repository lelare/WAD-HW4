const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use(express.json());
app.use(cookieParser());
const secret = "gdgdhdbcb770785rgdzqws";
const maxAge = 60 * 60;
const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

// check user authentication
app.get("/auth/authenticate", async (req, res) => {
    console.log("authentication request has been arrived");
    const token = req.cookies.jwt;

    let authenticated = false;
    try {
        if (token) {
            await jwt.verify(token, secret, (err) => {
                if (err) {
                    console.log(err.message);
                    console.log("token is not verified");
                    return res.send({ authenticated: authenticated });
                } else {
                    console.log("author is authinticated");
                    authenticated = true;
                    return res.send({ authenticated: authenticated });
                }
            });
        } else {
            console.log("author is not authinticated");
            return res.send({ authenticated: authenticated });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

// signup
app.post("/auth/signup", async (req, res) => {
    try {
        console.log("a signup request has arrived");
        const { email, password, username } = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);
        const authUser = await pool.query(
            "INSERT INTO users(email, password, username) values ($1, $2, $3 ) RETURNING*",
            [email, bcryptPassword, username]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id);

        return res
            .status(201)
            .cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: authUser.rows[0].id }).send;
    } catch (err) {
        console.error(err.message);
        return res.status(400).send(err.message);
    }
});

// login
app.post("/auth/login", async (req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        return res
            .status(201)
            .cookie("jwt", token, { maxAge: 6000000, httpOnly: true })
            .json({ user_id: user.rows[0].id }).send;
    } catch (error) {
        return res.status(401).json({ error: error.message });
    }
});

// logout and delete the jwt
app.get("/auth/logout", (req, res) => {
    console.log("delete jwt request arrived");
    return res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" }).send;
});

// post request
app.post("/posts", async (req, res) => {
    try {
        console.log("a post request has arrived");
        const { body, user_id } = req.body;
        const comment_count = Math.floor(Math.random() * 20);
        const like_count = Math.floor(Math.random() * 20);
        const created_time = new Date();
        const formattedCreatedTime = created_time.toISOString().slice(0, 19).replace("T", " ");

        const name = await pool.query("SELECT username FROM users WHERE id = $1", [user_id]);
        const username = name.rows[0].username;

        const newpost = await pool.query(
            "INSERT INTO posts(body, user_id, created_time, comment_count, like_count) values ($1, $2, $3, $4, $5) RETURNING*",
            [body, user_id, formattedCreatedTime, comment_count, like_count]
        );

        const post = newpost.rows[0];
        console.log("new post", newpost);
        return res.status(201).json({ post: { ...post, username } });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});

// get all posts
app.get("/posts", async (req, res) => {
    try {
        const response = await pool.query("SELECT * FROM posts");
        let posts = [];

        const promises = response.rows.map(async (post) => {
            const name = await pool.query("SELECT username FROM users WHERE id = $1", [post.user_id]);
            const username = name.rows[0].username;
            return { ...post, username };
        });

        posts = await Promise.all(promises);

        console.log("posts", posts);
        return res.status(200).json({ posts });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});

// get post
app.get("/posts/:id", async (req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        const { id } = req.params;
        const posts = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (!posts.rows[0]) {
            return res.status(404).json({ err: `This post with id ${id} not found.` });
        }
        return res.status(200).json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});

// update post
app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req.body;
        console.log("update request has arrived");

        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (!post.rows[0]) {
            return res.status(404).json({ err: `This post with id ${id} not found.` });
        }

        let updatepost;

        if (body) {
            updatepost = await pool.query("UPDATE posts SET body = $2 WHERE id = $1 RETURNING*", [id, body]);
        }

        const name = await pool.query("SELECT username FROM users WHERE id = $1", [updatepost.rows[0].user_id]);
        const username = name.rows[0].username;
        return res.status(200).json({ post: { ...updatepost.rows[0], username } });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});

// delete post
app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log("delete a post request has arrived");
        const post = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        if (!post.rows[0]) {
            return res.status(404).json({ err: `This post with id ${id} not found.` });
        }
        await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        return res.status(200).json({ msg: `This post with id ${id} successfully deleted.` });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});

// delete all posts
app.delete("/posts/all/:user_id", async (req, res) => {
    try {
        console.log("delete all posts request has arrived");
        const { user_id } = req.params;
        const posts = await pool.query("SELECT * FROM posts WHERE user_id = $1", [user_id]);

        if (!posts.rows[0]) {
            return res.status(404).json({ err: `No posts found.` });
        }
        console.log("here");
        await pool.query("DELETE FROM posts WHERE user_id = $1", [user_id]);
        return res.status(200).json({ msg: "All posts successfully deleted." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ err: err.message });
    }
});
