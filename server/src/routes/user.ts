import { Router } from "express";
import { listUsers, getUser, createUser, updateUser, deleteUser, searchUsers } from "../controllers/userController";

const router = Router();

router.get("/list", listUsers);
router.get("/search", searchUsers);
router.get("/:id", getUser);
router.post("/create", createUser);
router.put("/:id/edit", updateUser);
router.delete("/delete/:id", deleteUser);

export default router;
