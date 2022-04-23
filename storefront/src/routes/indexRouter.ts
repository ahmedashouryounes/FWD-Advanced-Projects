import authRouter from "./api/auth_router";
import userRouter from "./api/user_router"
import productRouter from "./api/product_router"
import orderRouter from "./api/order_router"
import order_productsRouter from "./api/order_products_router"
import dashboardRouter from "./api/dashboard_router"
import { Router } from "express";
const router = Router();



router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/orders', orderRouter);
router.use('/order_products', order_productsRouter);
router.use('/dashboard', dashboardRouter);


export default router;