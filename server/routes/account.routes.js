const { Router } = require("express");
const { account_post, account_deposit, account_withdraw, account_close } = require("../controllers/account.controllers");

const router = Router();

router.post("/api/account/open", account_post);

router.post("/api/account/deposit", account_deposit);

router.post("/api/account/withdraw", account_withdraw);

router.post("/api/account/close", account_close);

module.exports = router;