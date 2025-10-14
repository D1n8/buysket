import { Router } from "express";
import ProductsController from "../controllers/ProductsController.js";

const router = new Router();

router.post('/products', ProductsController.createProduct);
router.get('/products', ProductsController.getProducts);


export default router;