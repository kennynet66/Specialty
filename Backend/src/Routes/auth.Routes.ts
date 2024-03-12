import { Router } from "express";
import { loginUser, registerUser, validateUser } from "../Controllers/auth.Controller";

const authRoutes = Router();

authRoutes.post('/register', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.put('/validate-user/:id', validateUser);

export default authRoutes;