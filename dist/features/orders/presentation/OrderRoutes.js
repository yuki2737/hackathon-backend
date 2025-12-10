"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OrderController_1 = require("./OrderController");
const router = (0, express_1.Router)();
const orderController = new OrderController_1.OrderController();
router.post("/", orderController.create.bind(orderController));
router.get("/", orderController.list.bind(orderController));
exports.default = router;
//# sourceMappingURL=OrderRoutes.js.map