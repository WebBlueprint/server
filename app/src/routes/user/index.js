"use strict";

const express = require('express');
const router = express.Router();
const { verifyAuth } = require("../../utils/verifyAuth");
const ctrl = require("./user.ctrl");

router.get("/", ctrl.view.home);
router.get("/login", ctrl.view.login);
router.get("/signup", ctrl.view.signup);
router.post("/user", ctrl.api.user);
router.post("/login", ctrl.api.login);
router.post('/logout', ctrl.api.logout)
router.post("/signup", ctrl.api.signup);
router.post("/googlelogin", ctrl.api.googlelogin);
router.post("/verifyauth", verifyAuth);

module.exports = router;
