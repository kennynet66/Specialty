import { Router } from "express";
import { registerUser } from "../Controllers/auth.Controller";

const authRoutes = Router();

authRoutes.post('/register', registerUser);

export default authRoutes;