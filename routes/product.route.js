import express from "express";
import { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteSingleProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/product", createProduct);
router.get("/product", getAllProducts);
router.get("/product/:id", getSingleProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteSingleProduct);

export default router;