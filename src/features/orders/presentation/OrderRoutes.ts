import { Router } from "express";
import { OrderController } from "./OrderController";

const router = Router();
const orderController = new OrderController();

router.post("/", orderController.create.bind(orderController));
router.get("/", orderController.list.bind(orderController));

export default router;
