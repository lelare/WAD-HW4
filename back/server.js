const express = require("express");
const pool = require("./database");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const port = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: "http://localhost:8080", credentials: true }));

app.use(express.json()); // Parses incoming requests with JSON payloads and is based on body-parser.
app.use(cookieParser()); // Parse Cookie header and populate req.cookies with an object keyed by the cookie names.

const secret = "gdgdhdbcb770785rgdzqws";
const maxAge = 60 * 60; //unlike cookies, the expiresIn in jwt token is calculated by seconds not milliseconds

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
};

app.listen(port, () => {
    console.log("Server is listening to port " + port);
});

// check user is authentication
app.get("/auth/authenticate", async (req, res) => {
    console.log("authentication request has been arrived");
    const token = req.cookies.jwt; // assign the token named jwt to the token const

    let authenticated = false; // a user is not authenticated until proven the opposite
    try {
        if (token) {
            //checks if the token exists

            await jwt.verify(token, secret, (err) => {
                //token exists, now we try to verify it
                if (err) {
                    // not verified, redirect to login page
                    console.log(err.message);
                    console.log("token is not verified");
                    res.send({ authenticated: authenticated }); // authenticated = false
                } else {
                    // token exists and it is verified
                    console.log("author is authinticated");
                    authenticated = true;
                    res.send({ authenticated: authenticated }); // authenticated = true
                }
            });
        } else {
            //applies when the token does not exist
            console.log("author is not authinticated");
            res.send({ authenticated: authenticated }); // authenticated = false
        }
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// signup
app.post("/auth/signup", async (req, res) => {
    try {
        console.log("a signup request has arrived");
        //console.log(req.body);
        const { email, password } = req.body;

        const salt = await bcrypt.genSalt(); //  generates the salt, i.e., a random string
        const bcryptPassword = await bcrypt.hash(password, salt); // hash the password and the salt
        const authUser = await pool.query(
            // insert the user and the hashed password into the database
            "INSERT INTO users(email, password) values ($1, $2) RETURNING*",
            [email, bcryptPassword]
        );
        console.log(authUser.rows[0].id);
        const token = await generateJWT(authUser.rows[0].id); // generates a JWT by taking the user id as an input (payload)

        res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({ user_id: authUser.rows[0].id })
            .send;
    } catch (err) {
        console.error(err.message);
        res.status(400).send(err.message);
    }
});

// login
app.post("/auth/login", async (req, res) => {
    try {
        console.log("a login request has arrived");
        const { email, password } = req.body;
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "User is not registered" });

        // check password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        //console.log("validPassword:" + validPassword);
        if (!validPassword) return res.status(401).json({ error: "Incorrect password" });

        const token = await generateJWT(user.rows[0].id);
        res.status(201).cookie("jwt", token, { maxAge: 6000000, httpOnly: true }).json({ user_id: user.rows[0].id })
            .send;
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

//logout a user = deletes the jwt
app.get("/auth/logout", (req, res) => {
    console.log("delete jwt request arrived");
    res.status(202).clearCookie("jwt").json({ Msg: "cookie cleared" }).send;
});

// post request
app.post("/posts", async (req, res) => {
    try {
        console.log("a post request has arrived");
        const post = req.body;
        const newpost = await pool.query("INSERT INTO posts(body) values ($1) RETURNING*", [post.body]);
        res.json(newpost);
    } catch (err) {
        console.error(err.message);
    }
});

// get posts
app.get("/posts", async (req, res) => {
    try {
        console.log("get posts request has arrived");
        const posts = await pool.query("SELECT * FROM posts");
        res.json(posts.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get post
app.get("/posts/:id", async (req, res) => {
    try {
        console.log("get a post with route parameter  request has arrived");
        const { id } = req.params; // assigning all route "parameters" to the id "object"
        const posts = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
        res.json(posts.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update post
app.put("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = req.body;
        console.log("update request has arrived");
        const updatepost = await pool.query("UPDATE posts SET (title, body, urllink) = ($2) WHERE id = $1", [
            id,
            post.body,
        ]);
        res.json(updatepost);
    } catch (err) {
        console.error(err.message);
    }
});
