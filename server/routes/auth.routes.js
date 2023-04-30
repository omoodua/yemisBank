const { Router } = require("express");

const router = Router();

const {
    signup_post,
    login_post,
    logout_get,
} = require("../controllers/auth.controllers");

////////////
// Signup //
////////////

router.post("api/signup", signup_post);

///////////
// Login //
///////////

router.post("api/login", login_post);

////////////
// Logout //
////////////

router.get("api/logout", logout_get);

module.exports = router;
