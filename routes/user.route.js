const express = require("express");
const { createUser, findAllUser, getByIdUser, updateUser, deleteUser } = require("../controller/user.controller");
const userRoute = express.Router();

userRoute.post("/",createUser);
userRoute.get("/", findAllUser);
userRoute.get("/:id", getByIdUser);
userRoute.patch("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
