const express = require('express');
const router = express.Router();

const User = require('../modals/user.modal')
const upload = require('../midddleware/fileUploads')

router.get("", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.status(200).json(user);
    }
    catch (err)
    {
        return res.status(404).send(err.message)
    }
})


router.get("/profiledata/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate("tweets").lean().exec();
        return res.status(200).json(user);
    }
    catch (err)
    {
        return res.status(404).send(err.message)
    }
})


router.post("", async (req, res) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            profile_pic: req.body.profile_pic,
            cover_pic: req.body.cover_pic,
            following: req.body.following,
            followers: req.body.followers,
            joinedDate: req.body.joinedDate,
            bio: req.body.bio,
            location: req.body.location,
            website: req.body.website,
            dob: req.body.dob,
        })
        return res.status(201).send(user);
    }
    catch (err)
    {
        return res.status(401).send(err.message)
    }
})

                // username: req.params.username,
                // cover_pic: req.file.path.slice(85)

router.patch("/:userId", async (req, res) => {
    try {
        const userDefault = await User.findById(req.params.userId).lean().exec();
        const user = await User.findByIdAndUpdate(req.params.userId,{ ...userDefault, ...req.body });
        
        return res.status(201).send("user updated");
    }
    catch (err)
    {
        return res.status(401).send(err.message)
    }
})


router.patch("/:id/follower", async (req, res) => {
    try {
        const userDefault = await User.findById(req.params.id).lean().exec();
        const newUser = req.body;

        let x = newUser._id.toString();

        userDefault.following.push(x);
        const user1 = await User.findByIdAndUpdate(userDefault._id,userDefault);

        newUser.followers.push(req.params.id);
        const user2 = await User.findByIdAndUpdate(newUser._id, newUser);

        return res.status(201).send("followed updated");
    }
    catch (err)
    {
        return res.status(401).send(err.message)
    }
})


router.patch("/:id/unfollow", async (req, res) => {
    try {
        
        const userDefault = await User.findById(req.params.id).lean().exec();
        const newUser = req.body;

        const newTray1 = userDefault.following.filter((el) => {
            return el.toString() !== newUser._id
        })

        userDefault.following = newTray1;
        const user1 = await User.findByIdAndUpdate(userDefault._id, userDefault);        

        const newTray2 = newUser.followers.filter((el) => {
            return el !== req.params.id
        })
        newUser.followers = newTray2;
        const user2 = await User.findByIdAndUpdate(newUser._id, newUser);

        return res.status(201).send("unfollowed updated");
    }
    catch (err)
    {
        return res.status(401).send(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findOneAndDelete(req.params.id)
        return res.status(201).send(user);
    }
    catch (err)
    {
        return res.status(401).send(err.message)
    }
})
module.exports = router;