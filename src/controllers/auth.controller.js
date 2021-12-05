const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("../modals/user.modal");

const newToken = (user) => {
    return jwt.sign({ user: user }, "ssshhhhssss");
};

const signup = async (req, res) => {
    
    try {
        // 1. first check if a user with that email already exists
        let user = await User.findOne({ username: req.body.username }).lean().exec();

        // 2. if users exist then throw an errror
        if (user) return res.status(400).send({ status: "failed", message: "This username is already registered." })

        // 3.  otherwise create a user and then hash the password
        user = await User.findOne({ email: req.body.email }).lean().exec()
        if (user) return res.status(400).send({ status: "failed", message: "This email id is already registered." })
        user = await User.create(req.body);
        if (!user) return res.status(500).send({ status: "failed", message: "Something went wrong. Please try again after some time." });
        const token = newToken(user);
        res.status(201).json({ user, token });
    } catch (err) {
        if (!user) return res.status(500).send({ status: "failed", message: "Something went wrong. Please try again after some time." });
    }
}

const login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec()
        if (!user) return res.status(400).send({ status: "failed", message: "Invalid Credentials" });
        if (user.password !== req.body.password) return res.status(400).send({ status: "failed", message: "Invalid Credentials" });
        const token = newToken(user);
        return res.status(201).json({ token, user })
    } catch (err) {
        return res.status(500).send({ status: "failed", message: "Oops! Something went wrong. Please try again after some time." });
    }
}

module.exports = { signup, login}