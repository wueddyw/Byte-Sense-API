const mongoose = require("mongoose");
const connectDB = require("./DBConnection");
const userTable = mongoose.model("user");

module.exports = 
{
    fetchData: function(callback)
    {
        let userData = userTable.find({});
        userData.exec(function(err, data)
        {
            if (err) throw err;
            return callback(data);
        });
    }
}