const express = require("express");
const productRoute = express.Router();
const { createProduct, deleteProduct, findAllProduct, findByIdProduct, updateProduct } = require("../controller/product.controller");
const authGuard = require("../middleware/auth.guard");
const roleGuard = require("../middleware/role.guard");


productRoute.post("/",roleGuard("admin","user"),createProduct);
productRoute.get("/", findAllProduct);
productRoute.get("/:id", findByIdProduct);
productRoute.patch("/:id" ,updateProduct);
productRoute.delete("/:id",  deleteProduct);

module.exports = productRoute;
