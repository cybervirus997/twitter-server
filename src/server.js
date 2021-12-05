const express = require('express');
const connect = require('./config/db')
const cors = require('cors');
const userController = require("./controllers/user.controller")
const tweetController = require("./controllers/tweet.controller")
const commentController = require("./controllers/comment.controller")
const { signup, login} = require("./controllers/auth.controller");
const app = express();


app.use(cors());
app.use(express.json());

app.use("/user", userController);
app.use("/tweet", tweetController);
app.use("/comment", commentController);
app.use("/signup", signup);
app.use("/login", login);

const PORT = process.env.PORT || 3007;
    
    app.listen(PORT, async() => {
        await connect();
        console.log("listening on port 3007")
    })
