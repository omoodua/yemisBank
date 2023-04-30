const { Router } = require("express");
const { review_post, review_get } = require("../controllers/review.controllers");

const router = Router();

router.get("/reviews", review_get);

router.post("/reviews", review_post);

module.exports = router;