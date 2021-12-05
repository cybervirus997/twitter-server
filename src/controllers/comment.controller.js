const express = require('express');
const router = express.Router();

const upload = require('../midddleware/fileUploads');
const Comment = require('../modals/comment.model');
const Tweet = require('../modals/tweet.model')

router.get("", async (req, res) => {
    try {
        const comment = await Comment.find().populate("userId").lean().exec();
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).send(error);
    }
})

router.post("", upload.single("commentPic"), async (req, res) => {
    try {
        const comment = await Comment.create({
            tweetId: req.body.tweetId,
            commentTitle: req.body.commentTitle,
            commentPic: req.file,
            userId: req.body.userId,
            userName: req.body.userName,
            userImage: req.body.userImage,
            userUserName: req.body.userUserName,
        })
        const tweet1 = await Tweet.findById(req.body.tweetId).lean().exec();
        let arr = tweet1.comment;
        arr.push(comment);
        const tweet2 = await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { comment: arr });

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).json(error);
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).send(error);
    }
})


module.exports = router;