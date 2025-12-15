import { Router } from "express";
import { ThreadController } from "./ThreadController";
import { MessageController } from "./MessageController";

const router = Router();
const threadController = new ThreadController();
const messageController = new MessageController();

router.post("/", threadController.create.bind(threadController));
router.get("/", threadController.list.bind(threadController));
router.get("/:id", threadController.detail.bind(threadController));

router.post("/:id/messages", messageController.send.bind(messageController));
router.get("/:id/messages", messageController.list.bind(messageController));

export default router;
