const express = require("express");
const { register, login, refresh, logout } = require("../controller/auth.controller");
const authGuard = require("../middleware/auth.guard");
const roleGuard = require("../middleware/role.guard");
const authRoute = express.Router();

authRoute.post("/register", register);
authRoute.post("/login",login);
authRoute.post("/refresh", refresh);
authRoute.post("/logout", authGuard,logout);


module.exports = authRoute;
