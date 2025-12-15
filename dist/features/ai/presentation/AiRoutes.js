"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AiController_1 = require("./AiController");
const router = (0, express_1.Router)();
const controller = new AiController_1.AiController();
// POST /ai/generate-description
router.post("/generate-description", async (req, res, next) => {
    try {
        await controller.generateDescription(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
//# sourceMappingURL=AiRoutes.js.map