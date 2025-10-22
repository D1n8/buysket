import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";

const router = new Router();

router.get('/category', CategoryController.getCategories);
router.get('/category/:id', CategoryController.getOneCategory);
router.post('/category', CategoryController.createCategory);
router.delete('/category/:id', CategoryController.deleteCategory);

export default router;
