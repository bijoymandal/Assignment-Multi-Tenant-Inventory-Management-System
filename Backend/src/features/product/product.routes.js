import express from "express";
import productController from "./product.controller.js";


const productRouter = express.Router();
const ProductController = new productController();

productRouter.get("/",ProductController.productList);

export default productRouter;