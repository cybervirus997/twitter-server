const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    title: { type: String, required: true },
    image: { type: String , default: ''},
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    retweet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('tweet', tweetSchema);