const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    tweetId: { type: mongoose.Schema.Types.ObjectId, ref: 'tweet', required: true },
    commentTitle: { type: String, required: true },
    commentPic: {type: String},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, required: true },
    userImage: { type: String },
    userUserName : { type: String, required: true}
}, {
    versionKey: false,
    timestamps : true
})

module.exports = mongoose.model("comment", commentSchema);