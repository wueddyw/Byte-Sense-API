const User = require("../DB/User");
const UserSession = require("../DB/UserSession");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.post('/api/account/signup', (req, res, next) =>
{
    console.log("Reached start of route");
    
    const { body } = req;
    const
    {
        firstName,
        lastName,
        password
    } = body;
    let
    {
        email
    } = body;

    if (!firstName)
    {
        console.log("first name error");
        return res.end
        ({
            success: false,
            message: "Error: First name cannot be blank"
        });
    }
    
    if (!lastName)
    {
        console.log("last name error");
        return res.end
        ({
            success: false,
            message: "Error: Last name cannot be blank"
        });
    }

    if (!email)
    {
        console.log("email error");
        return res.end
        ({
            success: false,
            message: "Error: Email cannot be blank"
        });
    }

    if (!password)
    {
        console.log("password error");
        return res.end
        ({
            success: false,
            message: "Error: Password cannot be blank"
        });
    }

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find
    ({
        email: email
    }, (err, previousUsers) =>
    {
        if (err)
        {
            console.log("line 62");
            return res.end
            ({
                success: false,
                message: "Error: Server error"
            });
        } else if (previousUsers.length > 0)
        {
            console.log("acc already exists");
            return res.end
            ({
                success: false,
                message: "Error: Account already exists"
            }); 
        }
 
        // Save the new user
        const newUser = new User();

        newUser.email = email;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.password = newUser.generateHash(password);
        
        newUser.save((err, user) =>
        {
            if (err)
            {
                return res.end
                ({
                    success: false,
                    message: "Error: Server error"
                });
            }
            console.log("Successfully saved user to DB");
            return res.send
            ({
                success: true,
                message: "Signed up"
            })
        });
    });

});

router.post("/api/account/signin", (req, res, next) =>
{
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if (!email)
    {
        console.log("email error");
        return res.end
        ({
            success: false,
            message: "Error: Email cannot be blank"
        });
    }

    if (!password)
    {
        console.log("password error");
        return res.end
        ({
            success: false,
            message: "Error: Password cannot be blank"
        });
    }

    email = email.toLowerCase();

    User.find
    ({
        email: email
    }, (err, users) =>
    {
        if (err)
        {
            console.log("server error");
            return res.end
            ({
                success: false,
                message: "Error: server error"
            });
        }

        if (users.length != 1)
        {
            console.log("invalid email");
            return res.end
            ({
                success: false,
                message: "Error: Invalid email"
            });
        }

        const user = users[0];

        if (!user.validPassword(password))
        {
            console.log("invalid password");
            return res.send
            ({
                success: false,
                message: "Error: Invalid password"
            });
        }

        // Otherwise correct user
        const userSession = new UserSession();
        userSession.userID = user._id;
        userSession.save((err, doc) =>
        {
            if (err)
            {
                console.log("??? error");
                return res.send({
                    success: false,
                    message: "Error: server error"
                });
            }

            return res.send({
                success: true,
                message: "Valid sign in",
                token: doc._id
            });
        });
    })

});

router.get("/api/account/verify", (req, res, next) =>
{
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it is not deleted
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) =>
    {
        if (err)
        {
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }

        if (sessions.length != 1)
        {
            return res.send({
                success: false,
                message: "Error: Invalid"
            });
        } else
        {
            return res.send({
                success: true,
                message: "Valid user session"
            });
        }
    });
});

router.get("/api/account/logout", (req, res, next) =>
{
    // Get the token
    const { query } = req;
    const { token } = query;

    // Verify the token is one of a kind and it is not deleted
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, 
    {
        $set: {isDeleted: true}
    }, null, (err, sessions) =>
    {
        if (err)
        {
            return res.send({
                success: false,
                message: "Error: Server error"
            });
        }

            return res.send({
                success: true,
                message: "Logged out"
            });
    });
});

module.exports = router;