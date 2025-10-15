import { Router } from "express";
import ProductsController from "../controllers/ProductsController.js";
import upload from "../middleware/upload.js";

const router = new Router();

router.post('/products', upload.array("images", 3),ProductsController.createProduct);
router.get('/products', ProductsController.getProducts);


export default router;