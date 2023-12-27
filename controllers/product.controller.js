// / import product from "../models/products.model.js"
import Product from "../models/product.model.js";
// import bcrypt from "bcrypt"

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { p_id, p_price, p_title} = req.body;
        const newProduct = new Product({ p_id, p_price, p_title });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products) {
            return res.status(404).json({ message: "Products not found" });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product
export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const singleProduct = await Product.findById(id);
        if (!singleProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(singleProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a single product
export const deleteSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Successfully deleted product" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};