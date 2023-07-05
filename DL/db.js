const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL
// const MONGO_URL = "mongodb+srv://test:1234@cluster0.ylji8dh.mongodb.net/playlist/?retryWrites=true&w=majority"
const connect = async () => {
    try {
        const con = await mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true})
        console.log(`Connection Success, State`, mongoose.connection.readyState);
    }
    catch (err) {
        console.log("Mongo Error : ", err.message);
    }
}
(connect)
module.exports = {connect}