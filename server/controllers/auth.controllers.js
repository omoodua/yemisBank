// Import the User model
const User = require("../models/user.models");

// Import Helper functions
const handleErrors = require("../helpers/handleError.helper");
const { createToken } = require("../helpers/jwt.helper");

////////////
// Signup //
////////////

const signup_post = async (req, res) => {
    const { email, password, username } = req.body;
    const totalBalance = 100;

    try {
        // Create a new user
        const user = await User.create({
            email,
            password,
            username,
            totalBalance,
        });

        console.log("from try", user);

        // Create token with jwt
        const token = await createToken(user._id);

        // Save the token to the cookies
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000 * 3 * 24 * 60 * 60,
        });

        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        console.log("from controllers", errors);
        res.status(400).json({
            message: "That email has already been registered.",
        });
    }
};

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Uses the custom static function login() to find the user in the db and return it
        const user = await User.login(email, password);

        if (user.message === "Incorrect email/password") {
            res.status(400).json(user);
        }

        // Create a token with jwt
        const token = await createToken(user["_id"]);

        // Save the JWT as a cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 1000 * 3 * 24 * 60 * 60,
        });

        // final response to front end
        res.status(200).json(user);
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "Log out successful" });
};

module.exports = {
    signup_post,
    login_post,
    logout_get,
};
