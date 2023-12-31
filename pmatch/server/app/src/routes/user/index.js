"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/", ctrl.view.home);
router.get("/login", ctrl.view.login);
router.get("/signup", ctrl.view.signup);
router.post("/login", ctrl.api.login);
router.post("/signup", ctrl.api.signup);

module.exports = router;
