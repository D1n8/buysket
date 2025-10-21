import { Router } from "express";
import ProductsController from "../controllers/ProductsController.js";
import upload from "../middleware/upload.js";

const router = new Router();

router.post('/products', upload.array("images"),ProductsController.createProduct);
router.get('/products', ProductsController.getProducts);
router.delete('/products/:id', ProductsController.deleteProduct);


export default router;