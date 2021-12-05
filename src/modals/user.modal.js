
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    name: { type: String, required: true },
    email: { type: String, required: true,unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true ,unique: true},
    profile_pic: { type: String ,default:"https://i.imgur.com/nRhKKpR.png"},
    cover_pic: { type: String, default:"https://i.imgur.com/lnd2NHQ.png"},
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "user",unique:true}],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref:"user",unique:true}],
    bio: { type: String },
    joinedDate: { type: String ,required: true},
    location: { type: String},
    website: { type: String},
    dob: { type: String, required: true },
    tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tweet'}],
}, {
    versionKey: false,
    timestampKey: true,
})

const User = mongoose.model("user", userSchema);

module.exports = User;