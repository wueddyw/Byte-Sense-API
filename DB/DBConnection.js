const mongoose = require("mongoose");
const URI = "mongodb+srv://system:NqSz2tbYfcQ.5FT@cluster0.gmmqp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () =>
{
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true 
    });

    console.log("Connected to database");
};

module.exports = connectDB;