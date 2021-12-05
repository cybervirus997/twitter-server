const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect("mongodb+srv://cybervirus997:pluralsightU-3@cluster0.rwxtn.mongodb.net/twitterDatabase?retryWrites=true&w=majority");
}

module.exports = connect;

//mongodb+srv://cybervirus997:pluralsightU-3@cluster0.rwxtn.mongodb.net/twitterDatabase?retryWrites=true&w=majority