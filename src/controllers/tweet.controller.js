const express = require('express');
const router = express.Router();

const User = require('../modals/user.modal')
const Tweet = require("../modals/tweet.model");
const upload = require("../midddleware/fileUploads")

router.get("", async (req, res) => {
    try {
        const tweet = await Tweet.find({}).populate("userId").populate("comment").lean().exec();
        return res.status(200).json({tweet})
    } catch (error) {
        return res.status(400).send(error)
    }
})

router.post("",upload.single("image"),async (req, res) => {
    try {
        let tweet;
        if (req.file!==undefined ){
             tweet = await Tweet.create({
                userId: req.body.userId,
                title: req.body.title,
                image: req.file.path,
                comment: req.body.comment,
                like: req.body.like,
                retweet: req.body.retweet,
            });
        } else
        {
             tweet = await Tweet.create({
                userId: req.body.userId,
                title: req.body.title,
                // image: req.file.path,
                comment: req.body.comment,
                like: req.body.like,
                retweet: req.body.retweet,
            });
        }
        const updatedTweet = await User.findById(req.body.userId).lean().exec();
        updatedTweet.tweets.push(tweet._id);
        const user = await User.findByIdAndUpdate(req.body.userId,updatedTweet).lean().exec();
        return res.status(200).json(user);
        
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.get("/:id", async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id).populate("userId").lean().exec();
        const userName = tweet.userId.name;
        const tweeted = tweet.title;
        const string= userName+ " "+" twetted "+ tweeted
        return res.status(200).send(string)
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.delete("/:userId/:id", async (req, res) => {
    try {
        const tweet = await Tweet.findByIdAndDelete(req.params.id).lean().exec();

        const user123 = await User.findById(req.params.userId).lean().exec();
        let x = user123.tweets.filter((el) => {
            return el.toString() !== req.params.id
        })
        user123.tweets = x;
        const user111 = await User.findByIdAndUpdate(req.params.userId,user123).lean().exec();

        return res.status(200).send("tweet deleted")
    } catch (error) {
        return res.status(400).send(error)
    }
})


router.post("/:tweeetId/:userId/like", async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.tweeetId).lean().exec();
        tweet.like.push(req.params.userId);
        const tweet1 = await Tweet.findByIdAndUpdate(req.params.tweeetId,tweet)
        return res.status(200).send("updated like");
    } catch (error) {
        return res.status(400).send(error);
    }
})


router.post("/:tweeetId/:userId/dislike", async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.tweeetId).lean().exec();
        let x = tweet.like.filter((el) => {
            return el.toString() !== req.params.userId
        })

        tweet.like = x;
        const tweet1 = await Tweet.findByIdAndUpdate(req.params.tweeetId,tweet)

        return res.status(200).send("updated dislike");
    } catch (error) {
        return res.status(400).send(error);
    }
})

router.post("/:tweeetId/:userId/retweetadd", async (req, res) => {
   try {
        const tweet = await Tweet.findById(req.params.tweeetId).lean().exec();
       tweet.retweet.push(req.params.userId);

       const tweet1 = await Tweet.findByIdAndUpdate(req.params.tweeetId, tweet);
        return res.status(200).send("updated retweet");
    } catch (error) {
        return res.status(400).send(error);
    }
})

module.exports = router;