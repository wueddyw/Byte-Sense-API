const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const user = new mongoose.Schema
({
    firstName:
    {
        type: String,
        default: ""
    },
    lastName:
    {
        type: String,
        default: ""
    },
    email:
    {
        type: String,
        default: ""
    },
    password:
    {
        type: String,
        default: ""
    },
    isDeleted:
    {
        type: Boolean,
        default: false
    }
});

user.methods.generateHash = function(password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

user.methods.validPassword = function(password)
{
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("user", user);